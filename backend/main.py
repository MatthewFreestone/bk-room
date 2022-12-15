from dotenv import load_dotenv
load_dotenv()

from flask import Flask, render_template, request, redirect, url_for, send_file
import requests
from src.utils import room_num_to_id
from src.mongo import *

app = Flask(__name__, static_folder='../frontend/build/static', template_folder='templates')
URL = "https://spider.eng.auburn.edu/makerspace/ajax-multi.php"

@app.route('/')
def index():
    return render_template('index.html', reservations=get_all_entries())

@app.route('/react')
def react():
    return send_file('../frontend/build/index.html')

@app.route('/reserve', methods=['POST'])
def reserve():
    room_num = request.form['room']
    object_num = room_num_to_id(room_num)
    username = request.form['username']
    start_time = request.form['start']
    end_time = request.form['end']
    date = request.form['date']
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

@app.route('/delete', methods=['POST'])
def delete():
    room_num = room_num_to_id(request.form['room'])
    appt_id = int(request.form['appt_id'])
    post_data = {
        "object": room_num,
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