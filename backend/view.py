from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__,
            template_folder='../frontEnd',
            static_folder='../disenno')

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # Handle form submission or other POST requests here
        return redirect(url_for('index'))
    return render_template('landing.html')

if __name__ == '__main__':
    app.run(debug=True)