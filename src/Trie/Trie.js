import TrieNode from '../TrieNode'

class Trie {
  constructor (char) {
    this.root = new TrieNode()
  }

  insert (word = '') {
    let node = this.root

    for (const char of word.toString()) {
      let nextNode = node.nextNodes[char]

      if (!nextNode) {
        const newNode = new TrieNode(char)
        newNode.prevNode = node
        nextNode = node.nextNodes[char] = newNode
      }
      node = nextNode
    }

    node.isWordEnd = true
  }

  /**
   * Insert a set of texts. Can be a string, with each text defined by a newline
   * delimiter, or an array of texts. Anything which is not a string will be
   * converted to a string.
   */
  insertCorpus (corpus) {
    let set = [corpus?.toString()]

    if (typeof corpus === 'string') {
      set = corpus.match(/[^\r\n]+/g) || []
    } else if (Array.isArray(corpus)) {
      set = corpus
    }

    set.forEach(text => this.insert(text))

    return set
  }

  contains (word) {
    let node = this.root

    for (const char of word.toString()) {
      const nextNode = node.nextNodes[char]
      if (!nextNode) return false
      node = nextNode
    }

    return node.isWordEnd
  }

  find (clueChars = '') {
    let node = this.root
    const output = []

    for (const char of clueChars) {
      const nextNode = node.nextNodes[char]
      if (!nextNode) return output
      node = nextNode
    }

    this.findAll(node, output)
    return output
  }

  findAll (node, output = []) {
    if (node.isWordEnd) output.unshift(node.getWord())
    for (const next in node.nextNodes) {
      this.findAll(node.nextNodes[next], output)
    }
  }
}

export default Trie
