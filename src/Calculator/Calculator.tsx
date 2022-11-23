import React,{useState} from "react";
import { IBody } from "../App";
export interface PropsType {
    bodyInfo: IBody;
    setBodyInfo: React.Dispatch<React.SetStateAction<IBody>>
}
function Calculator({bodyInfo,setBodyInfo}:PropsType):JSX.Element{
    interface IBMI{
        bmi:number;
        health:string;
        healthy_bmi_range:number;
      }
      interface IBodyFat{
        'Body Fat (BMI method)':number;
        'Body Fat (U.S. Navy Method)':number;
        
        'Body Fat Mass':number;
        'Lean Body Mass':number;
      }
      interface IIdealWeight{
        Devine:number;
        Hamwi:number;
      Miller:number;
        Robinson:number;
      }
      interface ICalorie {
        BMR:number;
        'Extreme weight gain':{'gain weight': string, calory: number};
        'Extreme weight loss': {'loss weight': string, calory: number};
        'Mild weight gain': {'gain weight': string, calory: number};
        'Mild weight loss': {'loss weight':  string, calory: number};
        'Weight gain': {'gain weight':  string, calory: number};
        'Weight loss': {'loss weight':  string, calory: number};
        'Maintain weight':number;
      }
      interface IMacros{
        calorie:number;
        balanced: {protein: number, fat: number, carbs: number},
        highprotein: {protein: number, fat: number, carbs: number},
        lowcarbs: {protein: number, fat: number, carbs: number},
        lowfat: {protein: number, fat: number, carbs: number},
      }
      interface Ioptions{
        method:string,
        headers:{
          'X-RapidAPI-Key':string,
          'X-RapidAPI-Host': string,
        }
      }
      
      const[bmi, setBMI] = useState<IBMI>()
      const[bodyFatStat, setBodyFatStat] = useState<IBodyFat>()
      const [idealWeightResult, setIdealWeightResult] = useState<IIdealWeight>()
      const[calories, setCalories] = useState<ICalorie>()
      const [macrosResult, setMacrosResult] = useState<IMacros>()
      function BMI(){
       
        const key =  process.env.REACT_APP_KEY
        if(key){
          const options:Ioptions = {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key':key,
              'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com'
            }
          };
          fetch(`https://fitness-calculator.p.rapidapi.com/bmi?age=${bodyInfo?.age}&weight=${bodyInfo?.weight}&height=${bodyInfo?.height}`, options)
            .then(response => response.json())
            .then(response => setBMI({bmi:response.data.bmi, health:response.data.health, healthy_bmi_range:response.data.healthy_bmi_range}))
            .catch(err => console.error(err));
            document.querySelectorAll<HTMLElement>('.result')!.forEach(el=>el.style.display="none")
            document.querySelector<HTMLElement>('.bmi')!.style.display="block"
      
      }
    }
      function bodyFat(){
        const key =  process.env.REACT_APP_KEY
        if(key){
          const options:Ioptions = {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key':key,
              'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com'
            }
          };
        
        fetch(`https://fitness-calculator.p.rapidapi.com/bodyfat?age=${bodyInfo?.age}&gender=${bodyInfo?.gender}&weight=${bodyInfo?.weight}&height=${bodyInfo?.height}&neck=${bodyInfo?.neck}&waist=${bodyInfo?.waist}&hip=${bodyInfo?.hip}`, options)
          .then(response => response.json())
          .then(response => setBodyFatStat({ 'Body Fat (BMI method)':response.data['Body Fat (BMI method)'],'Body Fat (U.S. Navy Method)':response.data['Body Fat (U.S. Navy Method)'],'Body Fat Mass':response.data[ 'Body Fat Mass'],'Lean Body Mass':response.data['Lean Body Mass']}))
          .catch(err => console.error(err));
          document.querySelectorAll<HTMLElement>('.result')!.forEach(el=>el.style.display="none")
          document.querySelector<HTMLElement>('.bodyfat')!.style.display="block"
      
      }
    }
      function idealWeight(){
        const key =  process.env.REACT_APP_KEY
        if(key){
          const options:Ioptions = {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key':key,
              'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com'
            }
          };
        
        fetch(`https://fitness-calculator.p.rapidapi.com/idealweight?gender=${bodyInfo?.gender}&height=${bodyInfo?.height}`, options)
          .then(response => response.json())
          .then(response => setIdealWeightResult({Devine:response.data.Devine, Hamwi:response.data.Hamwi, Miller:response.data.Miller, Robinson:response.data.Robinson}))
          .catch(err => console.error('error:' + err)); 
          const div = document.querySelectorAll<HTMLElement>('.result')!.forEach(el=>el.style.display="none")
          document.querySelector<HTMLElement>('.idealweight')!.style.display="block"
      
      }
    }
      function dailyCalory(){
        const key =  process.env.REACT_APP_KEY
        if(key){
          const options:Ioptions = {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key':key,
              'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com'
            }
          };
        fetch(`https://fitness-calculator.p.rapidapi.com/dailycalorie?age=${bodyInfo?.age}&gender=${bodyInfo?.gender}&height=${bodyInfo?.height}&weight=${bodyInfo?.weight}&activitylevel=level_${bodyInfo?.activity}`, options)
          .then(response => response.json())
          //.then(response=>console.log(response))
          .then(response => setCalories({
            BMR:response.data.BMR,
            'Extreme weight gain':{'gain weight': response.data.goals['Extreme weight gain']['gain weight'], calory: response.data.goals['Extreme weight gain'].calory},
            'Extreme weight loss': {'loss weight':  response.data.goals['Extreme weight loss']['loss weight'], calory: response.data.goals['Extreme weight loss'].calory},
            'Mild weight gain': {'gain weight': response.data.goals['Mild weight gain']['gain weight'], calory: response.data.goals['Mild weight gain'].calory},
            'Mild weight loss': {'loss weight':  response.data.goals['Mild weight loss']['loss weight'], calory: response.data.goals['Mild weight loss'].calory},
            'Weight gain': {'gain weight':  response.data.goals['Weight gain']['gain weight'], calory: response.data.goals['Weight gain'].calory},
            'Weight loss': {'loss weight': response.data.goals['Weight loss']['loss weight'], calory: response.data.goals['Weight loss'].calory},
            'Maintain weight':response.data.goals['maintain weight'],
          }))
          .catch(err => console.error('error:' + err)); 
          document.querySelectorAll<HTMLElement>('.result')!.forEach(el=>el.style.display="none")
          document.querySelector<HTMLElement>('.dailycalorie')!.style.display="block"
        }
      }
      function macros(){
        const key =  process.env.REACT_APP_KEY
        if(key){
          const options:Ioptions = {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key':key,
              'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com'
            }
          };
        
        fetch(`https://fitness-calculator.p.rapidapi.com/macrocalculator?age=${bodyInfo?.age}&gender=${bodyInfo?.gender}&height=${bodyInfo?.height}&weight=${bodyInfo?.weight}&activitylevel=${bodyInfo?.activity}&goal=${bodyInfo?.goal}`, options)
          .then(response => response.json())
          .then(response => setMacrosResult({
            calorie:response.data.calorie,
            balanced: {protein: Math.round(response.data.balanced.protein), fat: Math.round(response.data.balanced.fat), carbs: Math.round(response.data.balanced.carbs)},
            highprotein: {protein: Math.round(response.data.highprotein.protein), fat: Math.round(response.data.highprotein.fat), carbs: Math.round(response.data.highprotein.carbs)},
            lowcarbs:  {protein: Math.round(response.data.lowcarbs.protein), fat: Math.round(response.data.lowcarbs.fat), carbs: Math.round(response.data.lowcarbs.carbs)},
            lowfat:  {protein: Math.round(response.data.lowfat.protein), fat: Math.round(response.data.lowfat.fat), carbs: Math.round(response.data.lowfat.carbs)},
          }))
          .catch(err => console.error('error:' + err)); 
          document.querySelectorAll<HTMLElement>('.result')!.forEach(el=>el.style.display="none")
          document.querySelector<HTMLElement>('.macros')!.style.display="block"
        }
      }
    return (
        <div className='second'>
            <h2>Time to calculate!</h2>
            <p>What do you want to know?</p>
            <button onClick={BMI}>Body Mass Index</button>
            <br />
            <button onClick={bodyFat}>Body fat percentage</button>
            <br />
            <button onClick={idealWeight}>Ideal weight</button>
            <br />
            <button onClick={dailyCalory}>Daily calory requirement</button>
            <br />
            <button onClick={macros}>Macro nutrients</button>
            <br />
          <div className='bmi result'>
            <p>BMI: {bmi?.bmi}</p>
            <p>Health: {bmi?.health}</p>
            <p>BMI health range: {bmi?.healthy_bmi_range}</p>
            </div>
          <div className='bodyfat result'>
            <p>Body fat mass: {bodyFatStat?.['Body Fat Mass']} kg</p>
            <p>Body Fat (BMI method): {bodyFatStat?.['Body Fat (BMI method)']} kg</p>
            <p>Body Fat (U.S. Navy Method): {bodyFatStat?.['Body Fat (U.S. Navy Method)']} kg</p>
            <p>Lean body mass: {bodyFatStat?.['Lean Body Mass']} kg</p>
          </div>
          <div className='idealweight result'>
            <p>Ideal weight by Devine: {idealWeightResult?.Devine} kg</p>
            <p>Ideal weight by Hamwi: {idealWeightResult?.Hamwi} kg</p>
            <p>Ideal weight by Miller: {idealWeightResult?.Miller} kg</p>
            <p>Ideal weight by Robinson: {idealWeightResult?.Robinson} kg</p>
          </div>
          <div className='dailycalorie result'>
            <p>BMR: {calories?.BMR} kcal</p>
            <p>Extreme weight gain</p>
            <p>Gain weight: {calories?.['Extreme weight gain']['gain weight']}</p>
            <p>{calories?.['Extreme weight gain'].calory} kcal</p>
            <p>Extreme weight loss</p>
            <p> Loss weight: {calories?.['Extreme weight loss']['loss weight']}</p>
            <p>{calories?.['Extreme weight loss'].calory} kcal</p>
            <p>Maintain weight</p>
            <p>{calories?.['Maintain weight']} kcal</p>
            <p>Mild weight gain</p>
            <p>Gain weight: {calories?.['Mild weight gain']['gain weight']}</p>
            <p>{calories?.['Mild weight gain'].calory} kcal</p>
            <p>Mild weight loss</p>
            <p>Loss weight: {calories?.['Mild weight loss']['loss weight']}</p>
            <p>{calories?.['Mild weight loss'].calory} kcal</p>
            <p>Weight gain</p>
            <p>Gain weight: {calories?.['Weight gain']['gain weight']}</p>
            <p>{calories?.['Weight gain'].calory} kcal</p>
            <p>Weight loss</p>
            <p>Loss weight: {calories?.['Weight loss']['loss weight']}</p>
            <p>{calories?.['Weight loss'].calory} kcal</p>
          </div>
          <div className='macros result'>
            <p>{macrosResult?.calorie} kcal</p>
            <p>Balanced</p>
            <p>Protein: {macrosResult?.balanced.protein} g</p>
            <p>Fat: {macrosResult?.balanced.fat} g</p>
            <p>Carbs: {macrosResult?.balanced.carbs} g</p>
            <p>High protein</p>
            <p>Protein: {macrosResult?.highprotein.protein} g</p>
            <p>Fat: {macrosResult?.highprotein.fat} g</p>
            <p>Carbs: {macrosResult?.highprotein.carbs} g</p>
            <p>Low carbs</p>
            <p>Protein: {macrosResult?.lowcarbs.protein} g</p>
            <p>Fat: {macrosResult?.lowcarbs.fat} g</p>
            <p>Carbs: {macrosResult?.lowcarbs.carbs}</p>
            <p>Low fat</p>
            <p>Protein: {macrosResult?.lowfat.protein} g</p>
            <p>Fat: {macrosResult?.lowfat.fat} g</p>
            <p>Carbs: {macrosResult?.lowfat.carbs} g</p>
          </div>
          </div>
     
  );
}

export default Calculator