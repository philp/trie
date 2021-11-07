class TrieNode {
  constructor (char) {
    this.char = char
    this.prevNode = null
    this.nextNodes = {}
    this.isWordEnd = false
    return this
  }

  getWord () {
    let node = this
    const chars = []
    while (node.prevNode) {
      chars.unshift(node.char)
      node = node.prevNode
    }
    return chars.join('')
  }
}

export default TrieNode
