import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../App.vue'

describe('App.vue', () => {
  const wrapper = mount(App)
  it('App スナップショット', () => {
    expect(wrapper).toMatchSnapshot()
  })
  it('コンポーネントを描画できる', () => {
    // Componentを描画できる
    const wrapper = mount(App)
    const comp = wrapper.findComponent(App)
    expect(comp.exists()).toBe(true)
  })
})
