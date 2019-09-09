import { shallowMount } from '@vue/test-utils';
import Timer from '@/components/Timer.vue';

jest.useFakeTimers();

describe('Timer.vue', () => {
  it('generates 3 diffrent randow exercises each time', () => {
    const wrapper = shallowMount(Timer, {
      propsData: {
        focusTime: 25,
        breakTime: 5,
        workCycles: 5
      }
    });

    wrapper.vm.setRandomExercises();

    const firstRandomExercisesList = wrapper.vm.randomExercises;

    wrapper.vm.setRandomExercises();

    const secondRandomExercisesList = wrapper.vm.randomExercises;

    wrapper.vm.setRandomExercises();

    const thirdRandomExercisesList = wrapper.vm.randomExercises;

    expect(firstRandomExercisesList).not.toEqual(secondRandomExercisesList);

    expect(secondRandomExercisesList).not.toEqual(thirdRandomExercisesList);
  });
});
