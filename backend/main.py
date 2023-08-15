from dotenv import load_dotenv
load_dotenv()

from flask import Flask, request, make_response, send_file, url_for, send_from_directory, render_template
from flask_cors import CORS
import requests
from src.utils import room_num_to_id
import os
from src.mongo import get_all_entries, write_to_db, delete_from_db

REACT_BUILD_DIR = os.environ.get('REACT_BUILD_DIR', '../frontend/build')

app = Flask(__name__, static_folder=REACT_BUILD_DIR, template_folder=REACT_BUILD_DIR, static_url_path='')
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

URL = "https://spider.eng.auburn.edu/makerspace/ajax-multi.php"


@app.route('/')
def index():
    return render_template('index.html')
    # return send_from_directory(app.template_folder, 'index.html')
    
    # return send_file(REACT_INDEX)

@app.route('/api/get-reservations', methods=['GET'])
def get_reservations():
    past = request.args.get('past', default=False, type=bool)
    reservations = get_all_entries(past=past)
    if reservations:
        res = list(reservations)
        for r in res:
            r.pop('_id')
        res = sorted(res, key=lambda x: x['appt_id'], reverse=True)
    else:
        res = {[]}
    # print(res)
    return res

@app.route('/api/reserve', methods=['POST'])
def reserve():
    data = request.get_json()
    room_num = data['room']
    object_num = room_num_to_id(room_num)
    username = data['username']
    start_time = data['start']
    end_time = data['end']
    date = data['date']
    post_data = {
        "object": object_num,
        "username": username,
        "StartTime": start_time,
        "EndTime": end_time,
        "Date": date,
    }
    r = requests.post(URL, data=post_data)
    res = r.json()
    if res['error'] == False:
        post_data['appt_id'] = res['appt_id']
        post_data['room'] = room_num
        write_to_db(post_data)
        return {'appt_id': res['appt_id']}
    else:
        return make_response({'error': res['errorMsg']}, 400)

@app.route('/api/delete', methods=['POST'])
def delete():
    data = request.get_json()
    if ('room' not in data or 'appt_id' not in data):
        return make_response({'error': 'Missing room or appt_id'}, 400)
    room_num = data['room']
    object_num = room_num_to_id(room_num)
    appt_id = data['appt_id']
    post_data = {
        "object": object_num,
        "appt_id": int(appt_id),
        "delete": 1
    }
    r = requests.post(URL, data=post_data)
    res = r.json()
    if res['error'] == False:
        delete_from_db(appt_id)
        return {'appt_id': appt_id}
    else:
        return make_response({'error': res['errorMsg']}, 400)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=os.environ.get("PORT", 8080))