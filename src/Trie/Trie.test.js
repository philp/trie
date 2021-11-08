/* eslint-env jest */

import TrieNode from '../TrieNode'
import Trie from './Trie'

describe('Trie', () => {
  describe('insertCorpus()', () => {
    it('should exist', () => {
      expect(typeof new Trie().insertCorpus).toBeDefined()
    })

    it('should convert strings to arrays', () => {
      expect(new Trie().insertCorpus('')).toHaveLength(0)
      expect(new Trie().insertCorpus('a')).toHaveLength(1)
      expect(new Trie().insertCorpus('a\nb')).toHaveLength(2)
    })

    it('should retain arrays', () => {
      expect(new Trie().insertCorpus([])).toHaveLength(0)
      expect(new Trie().insertCorpus([''])).toHaveLength(1)
      expect(new Trie().insertCorpus(['', ''])).toHaveLength(2)
      expect(new Trie().insertCorpus(['', '', ''])).toHaveLength(3)
      expect(new Trie().insertCorpus(['a'])[0]).toBe('a')
      expect(new Trie().insertCorpus(['a', 'b'])[1]).toBe('b')
    })

    it('should convert anything else to array[1]', () => {
      expect(new Trie().insertCorpus({})).toHaveLength(1)
      expect(new Trie().insertCorpus({ foo: 'bar' })).toHaveLength(1)
      expect(new Trie().insertCorpus(1)).toHaveLength(1)
      expect(new Trie().insertCorpus(false)).toHaveLength(1)
      expect(new Trie().insertCorpus(true)).toHaveLength(1)
      expect(new Trie().insertCorpus(null)).toHaveLength(1)
    })

    it('should insert single text line', () => {
      const word = 'Llanfairpwllgwyngyll'
      const trie = new Trie()

      expect(trie.contains(word)).toBeFalsy()
      trie.insertCorpus(word)
      expect(trie.contains(word)).toBeTruthy()
    })

    it('should insert multiple text lines', () => {
      const words = ['foo', 'bar', 'baz']
      const trie = new Trie()

      words.forEach(word => expect(trie.contains(word)).toBeFalsy())
      trie.insertCorpus(words.join('\n'))
      words.forEach(word => expect(trie.contains(word)).toBeTruthy())
    })

    it('should insert array of texts', () => {
      const words = ['foo', 'bar', 'baz']
      const trie = new Trie()

      words.forEach(word => expect(trie.contains(word)).toBeFalsy())
      trie.insertCorpus(words)
      words.forEach(word => expect(trie.contains(word)).toBeTruthy())
    })

    it('should insert an array of non texts', () => {
      const words = [{}, {}, false]
      const trie = new Trie()

      words.forEach(word => expect(trie.contains(word)).toBeFalsy())
      trie.insertCorpus(words)
      words.forEach(word => expect(trie.contains(word)).toBeTruthy())
    })
  })

  describe('insert()', () => {
    it('should convert into a string', () => {
      const words = [{}, false, true, 1]
      const trie = new Trie()

      words.forEach(word => expect(trie.contains(word)).toBeFalsy())
      words.forEach(word => trie.insert(word))
      words.forEach(word => expect(trie.contains(word)).toBeTruthy())
    })

    it('should handle a zero char word', () => {
      const word = ''
      const trie = new Trie()
      trie.insert(word)
    })

    it('should insert a single char word', () => {
      const word = 'a'

      const trie = new Trie()
      trie.insert(word)
      expect(trie.root.nextNodes).toHaveProperty(word.charAt(0))
      expect(trie.root.prevNode).toBeNull()
      expect(trie.root.nextNodes[word].char).toBe(word.charAt(0))
      expect(trie.root.nextNodes[word].isWordEnd).toBeTruthy()
    })

    it('should insert a double char word', () => {
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
  })

  it('construct with a root node', () => {
    expect(new Trie().root).toBeInstanceOf(TrieNode)
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

  it('should not find string', () => {
    const word = 'car'
    const trie = new Trie()
    trie.insert(word)
    expect(trie.find('bat')).toHaveLength(0)
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
