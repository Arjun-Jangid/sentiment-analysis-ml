import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from src.data_preprocessing import text_clean, tokenize


def build_vectorizer(max_features=39355):

    vectorizer = TfidfVectorizer( 
        lowercase=True,
        preprocessor=text_clean,
        tokenizer=tokenize,
        token_pattern=None,
        max_features=max_features,
        ngram_range=(1, 2),
        min_df=3,
        max_df=0.8256311818252917,
        sublinear_tf=True,
        dtype=np.float32,
    )

    return vectorizer