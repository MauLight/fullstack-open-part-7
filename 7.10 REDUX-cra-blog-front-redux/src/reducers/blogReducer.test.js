import { blogReducer } from './blogReducer'
import deepFreeze from 'deep-freeze'

describe('blogReducer', () => {
  test('returns a new state with action NEW_BLOG', () => {
    const state = []
    const action = {
      type: 'NEW_BLOG',
      payload: {
        title: 'The ways in which you could be better than before',
        author: 'Mau_Light',
        url: 'www.something.com',
        likes: 99999,
        id: 'c3'
      }
    }

    deepFreeze(state)
    const newState = blogReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual(action.payload)
  })

  test('adds likes with ADD_BLOG action', () => {

    const state = [
      {
        title: 'The ways in which you could be better than before',
        author: 'Mau_Light',
        url: 'www.something.com',
        likes: 99999,
        id: 'c3'
      },
      {
        title: 'The amazing spirit will rise above this darkness',
        author: 'Mau_Light',
        url: 'www.hope.com',
        likes: 999999,
        id: 'a1'
      }
    ]

    const action = {
      type: 'ADD_LIKES',
      payload: {
        id: 'a1'
      }
    }

    deepFreeze(state)
    const newState = blogReducer(state, action)

    expect(newState).toHaveLength(2)
    expect(newState).toContainEqual(state[0])
    expect(newState).toContainEqual({
      title: 'The amazing spirit will rise above this darkness',
      author: 'Mau_Light',
      url: 'www.hope.com',
      likes: 1000000,
      id: 'a1'
    })

  })

})