from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def hello_world():
    return render_template('home.html')

@app.route("/features")
def features():
    return render_template('Features.html')

@app.route("/gallery")
def gallery():
    return render_template('Gallery.html')

if __name__ == "__main__":
    app.run(host ='0.0.0.0',debug=True)