from flask import Flask
from flask import jsonify

app = Flask(__name__)

@app.route('/')
def hello_world():
    return jsonify({'data': 'test message'})

if __name__ == '__main__':
    app.run(debug=True)
