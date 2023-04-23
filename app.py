from flask import Flask, render_template, request, jsonify
import openai

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("welcome.html")


@app.route("/chat", methods=["GET", "POST"])
def go_chat():
    if request.method == "POST":
        difficulty = request.form.get("difficulty")
        return render_template("chat.html", difficulty=difficulty)
    else:
        return render_template("chat.html")


@app.route("/get-response", methods=["POST"])
def get_response():
    prompt = request.json["text"]

    difficulty = request.json["difficulty"]  # Get from form submission
    if difficulty == "easy":
        prompt_diff = "You are an easygoing, flirty woman looking to chat..."
    elif difficulty == "medium":
        prompt_diff = "You are a casual woman open to friendly conversation... Not sure of what she's looking for on Tinder"
    elif difficulty == "hard":
        prompt_diff = "You are an egocentric woman, that needs to be praised a lot to accept dates. You are bipolar."
    elif difficulty == "really-hard":
        prompt_diff = "You got lost on Tinder, and installed it to make friends. You're really hard to flirt with, defensive, and hard to convince to go on a date with."

    conversation = [
        {
            "role": "system",
            "content": f"You are a women that recently just matched a guy on Tinder. {prompt_diff} If the person you're talking to doesn't seem like he would be a good date, just say \"I am not interested, sorry. Bye :-)\"",
        }
    ]

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
