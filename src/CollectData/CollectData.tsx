import React, { useState } from 'react'
import { IBody } from '../App'
import { PropsType } from '../Calculator/Calculator'
function CollectData({ bodyInfo, setBodyInfo }: PropsType): JSX.Element {

  const collectData = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const age = event.currentTarget.age.value
    const height = event.currentTarget.height.value
    const weight = event.currentTarget.weight.value
    const gender = event.currentTarget.gender.value
    const activity = event.currentTarget.activity.value
    const goal = event.currentTarget.goal.value
    const neck = event.currentTarget.neck.value
    const waist = event.currentTarget.waist.value
    const hip = event.currentTarget.hip.value
    console.log({ height, weight, gender });
    setBodyInfo({ age: age, height: height, weight: weight, gender: gender, activity: activity, goal: goal, neck: neck, waist: waist, hip: hip, date: new Date() })
    document.querySelector<HTMLElement>('.collected')!.innerText = 'Body data is ready to be very public! Ha-ha just kidding!'
    document.querySelector<HTMLElement>('.collected')!.style.fontSize = '16px'
    document.querySelector<HTMLElement>('.collected')!.style.paddingTop = '30px'
  }
  return (
    <div className='first'>
      <form onSubmit={collectData}>
        <p>Age</p>
        <input type="number" name="age" placeholder="Enter your age"></input>
        <p>Weight</p>
        <input type="number" name="weight" placeholder="Enter your weight in kg"></input>
        <p>Height</p>
        <input type="number" name="height" placeholder="Enter your height in cm"></input>
        <p>Choose your gender</p>
        <select name="gender">
          <option value='female'>Female</option>
          <option value='male'>Male</option>
        </select>
        <p>Choose your activity level</p>
        <select name="activity">
          <option value='1'>Little or no exercise</option>
          <option value='2'>Exercise 1-3 times/week</option>
          <option value='3'>Exercise 4-5 times/week</option>
          <option value='4'>Daily exercise or intense exercise 3-4 times/week</option>
          <option value='5'>Intense exercise 6-7 times/week</option>
          <option value='6'>Very intense exercise daily, or physical job</option>
        </select>
        <p>Choose your goal</p>
        <select name="goal">
          <option value='maintain'>Maintain weight</option>
          <option value='mildlose'>Mild weight loss</option>
          <option value='weightlose'>Weight loss</option>
          <option value='extremelose'>Extreme weight loss</option>
          <option value='mildgain'>Mild weight gain</option>
          <option value='weightgain'>Weight gain</option>
          <option value='extremegain'>Extreme weight gain</option>
        </select>
        <p>Enter your measurements</p>
        <div>
          <input name="neck" type="number" placeholder='Enter your neck measurements in cm' />
        </div>
        <div>
          <input name="waist" type="number" placeholder='Enter your waist measurements in cm' />
        </div>
        <div>
          <input name="hip" type="number" placeholder='Enter your hip measurements in cm' />
        </div>
        <div>
          <input className="tryBtn" type="submit" value="Let's collect your body data!" />
        </div>
      </form>
      <div className='collected'></div>
    </div>
  )
}

export default CollectData