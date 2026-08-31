from flask import Flask, render_template, request, redirect, url_for
import os

base_dir = os.path.dirname(os.path.abspath(__file__))
template_dir = os.path.join(base_dir, '../frontEnd')
static_dir = os.path.join(base_dir, '../disenno')

app = Flask(__name__,
            template_folder=template_dir,
            static_folder=static_dir)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # Handle form submission or other POST requests here
        return redirect(url_for('index'))
    return render_template('landing.html')

if __name__ == '__main__':
    app.run(debug=True)