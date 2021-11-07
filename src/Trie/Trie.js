import TrieNode from '../TrieNode'

class Trie {
  constructor (char) {
    this.root = new TrieNode()
  }

  insert (word = '') {
    let node = this.root

    for (const char of word) {
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

  contains (word) {
    let node = this.root

    for (const char of word) {
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
