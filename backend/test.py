import openai
import re

openai.api_key = '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'

def gpt_prompt(password, model="gpt-3.5-turbo"):
    prompt = f"give me 5 new passwords for this passsword (make it strong): {password}"
    messages = [{"role": "user", "content": prompt}]

    response = openai.ChatCompletion.create(

    model=model,

    messages=messages,

    temperature=0,
    )

    return response.choices[0].message["content"]


def generatePasswords(improveMe):
    
    passwordResponses = gpt_prompt(improveMe)
    matches = re.findall(r'\d+\.\s*(.+?)(?=\s\d+\.|\s*$)', gpt_prompt(improveMe))


    print(passwordResponses)
    print(matches)



generatePasswords("Password")
generatePasswords("cooldog")
generatePasswords("coffeeisgood")
