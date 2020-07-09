# pylint: disable=missing-function-docstring
# iterate through list by chunks
def chunker(seq, size):
    return (seq[pos:pos + size] for pos in range(0, len(seq), size))


# return all possible straight patterns
def straight_patterns():
    numbers = [14] + list(range(2, 15))
    patterns = []
    for i in range(0, 10):
        for chunk in chunker(numbers[i:], 5):
            if len(chunk) == 5:
                if chunk not in patterns:
                    patterns.append(chunk)
    return patterns
