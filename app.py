from flask import Flask, render_template, request

app = Flask(__name__, static_folder="static")

@app.route("/")
def doit():
    return render_template("main.jinja")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
