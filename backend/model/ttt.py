import passwordClassifer
def createTokens(f):
    tokens = []
    for i in f:
        tokens.append(i)
    return tokens

def inputPassword(password):
    return passwordClassifer.classifyPassword(password)

