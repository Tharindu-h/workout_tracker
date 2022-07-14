# utility/helper functions

# function to capitalize the first letter of each sentence
def capitalize_sentence(string):
	
	word_list = string.lower().split()
	result    = ""

	for index in range(0, len(word_list)):
		if index == len(word_list) - 1:
			result += word_list[index].capitalize()
		else:
			result += word_list[index].capitalize() + " "
	
	return result
