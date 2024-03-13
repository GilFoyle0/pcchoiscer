import React, { useEffect } from 'react'

import styles from './RangeInputGroup.module.css'
import cn from 'classnames';
import { RangeInputGroupProps } from './RangeInputGroupProps';

import RangeInput from './RangeInput/RangeInput';
import { useSelector } from 'react-redux';

import { changeCurrentMax, changeCurrentMin} from '../../store/reducers/rangeInputReducer';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { setFiltredParts } from '../../store/reducers/partsReducer';
import { useDebounce } from '../../hooks/useDebunce';




 export function RangeInputGroup({className, filterParts, searchTerm, ...props} : RangeInputGroupProps) {



  const dispatch = useAppDispatch();

  

  const storeParts = useAppSelector((state) => state.partsData.parts);

  


  let rangeInputData = useSelector((state : any) => state.rangeInputData);

  
  const handleOnChangeMin = (e : React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeCurrentMin(e.target.value));
  }

  const handleOnChangeMax = (e : React.ChangeEvent<HTMLInputElement>) => {

    dispatch(changeCurrentMax(e.target.value));
  }




  const debDataRange = useDebounce(rangeInputData, 500);
  


  useEffect(() => {

  console.log('1');
  
  let debInputRange = {...debDataRange};


  if (debInputRange.currentMin === '' && debInputRange.currentMax === '' && searchTerm === '') {

    dispatch(changeCurrentMin(''))
    dispatch(changeCurrentMax(''))
    dispatch(setFiltredParts(storeParts));
    
    return;
  } else if (debInputRange.currentMin === '' && debInputRange.currentMax === '' && searchTerm !== '') {

    let filtredItems = filterParts(storeParts);
    dispatch(setFiltredParts(filtredItems));
    return;
  }

  if (debInputRange.currentMin && debInputRange.currentMax) {

    if (Number(debInputRange.currentMax) < Number(rangeInputData.min)) {
      debInputRange.currentMax = rangeInputData.min;
      dispatch(changeCurrentMax(rangeInputData.min))
    }
  
    if (Number(debInputRange.currentMax) > Number(rangeInputData.max)) {
      debInputRange.currentMax = rangeInputData.max;
      dispatch(changeCurrentMax(rangeInputData.max));
    }
  
  
    if (Number(debInputRange.currentMin) < Number(rangeInputData.min)) {
      debInputRange.currentMin = rangeInputData.min;
      dispatch(changeCurrentMin(rangeInputData.min))
    }
  
    if (Number(debInputRange.currentMin) > Number(rangeInputData.max)) {
      debInputRange.currentMin = rangeInputData.max;
      dispatch(changeCurrentMin(rangeInputData.max));
    }
  
  
    
    if (Number(debInputRange.currentMax) < Number(debInputRange.currentMin)) {
      let temp = debInputRange.currentMin;
      debInputRange.currentMin = debInputRange.currentMax;
      debInputRange.currentMax = temp;
    }

    
    let filtredItems = filterParts(storeParts);


    filtredItems = filtredItems.filter((part) => part.price >= Number(debInputRange.currentMin) && part.price <= Number(debInputRange.currentMax))
    filtredItems = filtredItems.sort((a, b) => String(a.price).localeCompare(String(b.price), undefined, {numeric: true}))
    
    console.log(filtredItems);
    dispatch(setFiltredParts(filtredItems));
    dispatch(changeCurrentMin(debInputRange.currentMin));
    dispatch(changeCurrentMax(debInputRange.currentMax));
  }


  }, [debDataRange])










  return (
    <div {...props} className={cn(className, styles.wrapper)}>
      <h3 className={styles.header}>ЦЕНА</h3>
      <article className={styles.inputsContainer}>
        <div className={styles.inputWrap}>
          ОТ
          <RangeInput className={styles.input} minmax={rangeInputData.currentMin} placeholder={`от ${rangeInputData.min} `} handleOnChange={handleOnChangeMin} />
        </div>
        <div className={styles.inputWrap}>
          ДО
          <RangeInput className={styles.input} minmax={rangeInputData.currentMax} placeholder={`до ${rangeInputData.max} `} handleOnChange={handleOnChangeMax}/>
        </div>
      </article>
    </div>
  )
}


