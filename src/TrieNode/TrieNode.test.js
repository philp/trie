/* eslint-env jest */

import TrieNode from '.'

describe('TrieNode', () => {
  it('construct with char', () => {
    const chars = ['a', '1', '~', 'é', '±', '—']

    chars.forEach(char => {
      expect(new TrieNode(char).char).toBe(char)
    })
  })
})
