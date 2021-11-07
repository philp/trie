/* eslint-env jest */

import TrieNode from '../TrieNode'
import Trie from './Trie'

describe('Trie', () => {
  it('construct with a root node', () => {
    expect(new Trie().root).toBeInstanceOf(TrieNode)
  })

  it('should handle a zero char word', () => {
    const word = ''
    const trie = new Trie()
    trie.insert(word)
  })

  it('should add a single char word', () => {
    const word = 'a'

    const trie = new Trie()
    trie.insert(word)
    expect(trie.root.nextNodes).toHaveProperty(word.charAt(0))
    expect(trie.root.prevNode).toBeNull()
    expect(trie.root.nextNodes[word].char).toBe(word.charAt(0))
    expect(trie.root.nextNodes[word].isWordEnd).toBeTruthy()
  })

  it('should add a double char word', () => {
    const wordAB = 'ab'
    const wordAC = 'aC'

    const trie = new Trie()
    trie.insert(wordAB)
    trie.insert(wordAC)

    expect(trie.root.nextNodes).toHaveProperty(wordAB[0])
    expect(trie.root.prevNode).toBeNull()
    expect(trie.root.nextNodes[wordAB[0]].char).toBe(wordAB[0])
    expect(trie.root.nextNodes[wordAB[0]].isWordEnd).toBeFalsy()

    expect(trie.root.nextNodes).toHaveProperty(wordAC[0])
    expect(trie.root.prevNode).toBeNull()
    expect(trie.root.nextNodes[wordAC[0]].char).toBe(wordAC[0])
    expect(trie.root.nextNodes[wordAC[0]].isWordEnd).toBeFalsy()
  })

  it('should contain word', () => {
    const word = 'Llanfairpwllgwyngyll'
    const trie = new Trie()

    expect(trie.contains(word)).toBeFalsy()
    trie.insert(word)
    expect(trie.contains(word)).toBeTruthy()
  })

  it('should find nothing', () => {
    const trie = new Trie()
    expect(trie.find()).toHaveLength(0)
  })

  it('should find one thing', () => {
    const word = 'car'
    const trie = new Trie()
    trie.insert(word)
    expect(trie.find(word)).toHaveLength(1)
  })

  it('should find three things', () => {
    const words = ['car', 'carpet', 'carrot']
    const trie = new Trie()
    words.forEach(word => trie.insert(word))

    const results = trie.find('car')

    expect(results).toHaveLength(3)
    expect(results).toContain('car')
    expect(results).toContain('carpet')
    expect(results).toContain('carrot')
  })
})
