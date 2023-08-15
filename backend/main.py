from dotenv import load_dotenv
load_dotenv()

from flask import Flask, render_template, request, redirect, url_for, send_file
from flask_cors import CORS
import requests
from src.utils import room_num_to_id
from src.mongo import *

STATIC_FOLDER = os.environ.get('STATIC_FOLDER', '../frontend/build/static')
REACT_INDEX = os.environ.get('REACT_INDEX', '../frontend/build/index.html')

app = Flask(__name__, static_folder=STATIC_FOLDER)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
URL = "https://spider.eng.auburn.edu/makerspace/ajax-multi.php"

# @app.route('/')
# def index():
#     return render_template('index.html', reservations=get_all_entries(past=False))

@app.route('/')
def index():
    return send_file(REACT_INDEX)

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
        return redirect(url_for('index'))
    else:
        return {'error': res['errorMsg']}

@app.route('/api/delete', methods=['POST'])
def delete():
    data = request.get_json()
    if ('room' not in data or 'appt_id' not in data):
        return {'error': 'Missing room or appt_id'}
    room_num = data['room']
    object_num = room_num_to_id(room_num)
    appt_id = int(data['appt_id'])
    post_data = {
        "object": object_num,
        "appt_id": appt_id,
        "delete": 1
    }
    r = requests.post(URL, data=post_data)
    res = r.json()
    if res['error'] == False:
        delete_from_db(appt_id)
        return redirect(url_for('index'))
    else:
        return {'error': res['errorMsg']}

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=os.environ.get("PORT", 8080))