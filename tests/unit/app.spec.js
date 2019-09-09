import { shallowMount, mount } from '@vue/test-utils';
import App from '@//App.vue';

describe('App.vue', () => {
  it('dont allows to open a timer if the values are less then 1', () => {
    const wrapper = shallowMount(App);
    const btn = wrapper.find('button');

    wrapper.vm.focusTime = 0;
    wrapper.vm.breakTime = 0;
    wrapper.vm.cycles = 0;

    btn.trigger('click');

    expect(wrapper.vm.opend).toBe(false);

    wrapper.vm.focusTime = 1;
    wrapper.vm.breakTime = 1;
    wrapper.vm.cycles = 0;

    btn.trigger('click');

    expect(wrapper.vm.opend).toBe(false);

    wrapper.vm.focusTime = 1;
    wrapper.vm.breakTime = 1;
    wrapper.vm.cycles = 20;

    btn.trigger('click');

    expect(wrapper.vm.opend).toBe(true);
  });

  it('descreses input values only if there are more then 1', () => {
    const wrapper = mount(App);

    wrapper.vm.focusTime = 5;
    wrapper.vm.breakTime = 5;
    wrapper.vm.cycles = 5;

    for (let i = 0; i < 3; i++) {
      wrapper
        .findAll('button.bg-red-600')
        .at(i)
        .trigger('click');
    }

    expect(wrapper.vm.focusTime).toBe(4);
    expect(wrapper.vm.breakTime).toBe(4);
    expect(wrapper.vm.cycles).toBe(4);

    wrapper.vm.focusTime = 0;
    wrapper.vm.breakTime = 0;
    wrapper.vm.cycles = 0;

    for (let i = 0; i < 3; i++) {
      wrapper
        .findAll('button.bg-red-600')
        .at(i)
        .trigger('click');
    }
    expect(wrapper.vm.focusTime).toBe(0);
    expect(wrapper.vm.breakTime).toBe(0);
    expect(wrapper.vm.cycles).toBe(0);
  });
});
