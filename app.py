# For reference: https://code.visualstudio.com/docs/python/tutorial-flask

from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/visualgo")
def visualgo():
    return render_template("visualgo.html")

@app.route("/playgound")
def playground():
    return render_template("playground.html")

@app.route("/visualgo/linearSearch")
def linearSearch():
    return render_template("linearSearch.html")

@app.route("/visualgo/binarySearch")
def binarySearch():
    return render_template("binarySearch.html")

@app.route("/visualgo/linkedList")
def linkedList():
    return render_template("linkedList.html")

@app.route("/visualgo/sorting")
def sorting():
    return render_template("sorting.html")

@app.route("/sortingTemplates/selectionSort", methods=['GET'])
def selectionSort():
    return render_template("sortingTemplates/selectionSort.html")

if __name__ == "__main__":
    app.run(debug=True)