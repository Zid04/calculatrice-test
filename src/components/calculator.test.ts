import {mount} from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import {it, describe, expect, test, beforeEach} from 'vitest'
import Calculator from './Calculator.vue'

describe('Calculator.vue', () => {
    function getButtonByText(text: string, wrapper: VueWrapper) {
        return wrapper.findAll('button').find(button => button.text() === text);
    }
    function getDisplay(wrapper: VueWrapper) {
        return wrapper.find('.display');
    }
    let wrapper:VueWrapper = mount(Calculator);
beforeEach(() => {
wrapper = mount(Calculator);
})

test('verification affichage', () => {
    expect(getDisplay(wrapper).text()).toBe('0');
});

test('verification bouton AC', () => {
    expect(getButtonByText('AC', wrapper)?.text()).toBe('AC');
}); 
test('verification bouton 35', async () => {
    await getButtonByText('3', wrapper)?.trigger('click');
    await getButtonByText('5', wrapper)?.trigger('click');
    expect(getDisplay(wrapper).text()).toBe('35');
});

})