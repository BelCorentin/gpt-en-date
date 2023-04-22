from flask import Flask, render_template, request, jsonify
import openai

app = Flask(__name__)


conversation = [
    {
        "role": "system",
        "content": "You are a women that recently just matched a guy on Tinder. Engage in a flirty conversation. If the person you're talking to doesn't seem like he would be a good date, just say \"I'm blocking you bye\"",
    }
]


@app.route("/")
def index():
    return render_template("chat.html")


@app.route("/get-response", methods=["POST"])
def get_response():
    prompt = request.json["text"]
    conversation.append({"role": "user", "content": prompt})

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo", messages=conversation, max_tokens=100
    )
    conversation.append(
        {"role": "assistant", "content": response["choices"][0]["message"]["content"]}
    )
    gpt_reply = "\n" + response["choices"][0]["message"]["content"] + "\n"

    return jsonify(response=gpt_reply)


if __name__ == "__main__":
    app.run(debug=True)
