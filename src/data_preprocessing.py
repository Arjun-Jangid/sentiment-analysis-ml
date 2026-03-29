import re
import contractions
from bs4 import BeautifulSoup
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

stop_words = set(stopwords.words('english'))
negation_words = {"no", "nor", "not", "never", "none", "nobody", "nothing", "neither", "nowhere", "hardly", "barely", "scarcely", "cannot", "can't", "won't", "isn't", "aren't", "wasn't", "weren't", "don't", "doesn't", "didn't", "haven't", "hasn't", "hadn't", "shouldn't", "wouldn't", "couldn't", "mustn't", "mightn't", "shan't"}

for word in negation_words:
    stop_words.discard(word)

lemmatizer = WordNetLemmatizer()


def text_clean(text):
    text = BeautifulSoup(text, "html.parser").get_text() # remove HTML
    text = contractions.fix(text) # expand contractions
    text = re.sub(r'http\S+|www\S+|https\S+', '', text) # remove URLs
    text = re.sub(r"[^a-z\s']", "", text)   # remove numbers & special chars
    text = re.sub(r'\s+', ' ', text).strip() # remove extra spaces
    return text


def tokenize(text):
    tokens = text.split()
    # remove stopwords
    tokens = [token for token in tokens if token not in stop_words]
    # lemmatize
    tokens = [lemmatizer.lemmatize(token) for token in tokens]
    return tokens