from flask import Flask, render_template, request, redirect, url_for
from utils import room_num_to_id
import requests

# outline of a flask app
app = Flask(__name__)
URL = "https://spider.eng.auburn.edu/makerspace/ajax-multi.php"
# URL = "http://localhost:5000/test_endpoint"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/test_endpoint', methods=['POST'])
def test_endpoint():
    return dict(request.form)

@app.route('/reserve', methods=['POST'])
def reserve():
    room_num = room_num_to_id(request.form['room'])
    username = request.form['username']
    start_time = request.form['start']
    end_time = request.form['end']
    date = request.form['date']
    post_data = {
        "object": room_num,
        "username": username,
        "StartTime": start_time,
        "EndTime": end_time,
        "Date": date,
    }
    r = requests.post(URL, data=post_data)
    print(r.json())
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)