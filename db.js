import { supabase } from './supabase.ts';

export async function fetchAll({
    table,
    onSuccess=()=>{}, 
    onFail=()=>{},
  }) {
  try {
    const { data, error } = await supabase.from(table).select();

    if (error) {
      throw error;
    }
    
    console.log(data);
    return data;
  } catch (error) {
    console.log('Error', error.message);
  }
}

export async function insertRow({
    table, 
    row, 
    onSuccess=()=>{}, 
    onFail=()=>{},
  }) {
  
  try {
    const { status, error } = await supabase.from(table).insert(row);

    if (error) {
      throw error;
    }
    
    if (status === 201) {
      onSuccess();
    } else {
      console.log(status);
    }
  } catch (error) {
    console.log('Error', error.message);
  }
}

export async function fetchByColumn({ 
    table, 
    column, 
    value, 
  }) {
  try {
    const { data, error } = await supabase.from(table).select().eq(column, value);
    return data;
  } catch (error) {
    return null;
  }
}