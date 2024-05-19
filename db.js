import React from 'react';
import { supabase } from './supabase.ts';

export async function fetchAll(table) {
  const { data, error } = await supabase.from(table).select();
  if (error) throw error;
  return data;
}

export async function deleteRow(table, column, value) {
  const { error } = await supabase
    .from(table)
    .delete()
    .eq(column, value);
  if (error) throw error;
}

export async function insertRow(table, row) {
  const { status, error } = await supabase.from(table).insert(row);
  if (String(status)[0] !== '2') throw error;
}

export async function insertRowReturn(table, row) {
  const { data, status, error } = await supabase.from(table).insert(row).select();
  if (String(status)[0] !== '2') throw error;
  return data[0];
}

export async function fetchByColumn(table, column, value, select=null) {
  const { data, error } = await supabase.from(table).select(select).eq(column, value);
  if (error) return null;
  return data;
}

export async function upsertRow(table, data) {
  const { status, error } = await supabase
    .from(table)
    .upsert(data);
  if (String(status)[0] !== '2') throw error;
}

export async function getCountConditional(table, conditionColumn, conditionValue) {
  const { count, error } = await supabase
    .from(table)
    .select('*', { count: 'exact', head: true })
    .eq(conditionColumn, conditionValue);
  if (error) return 0;
  return count;
}

export async function getSellerStats(userid) {
  try {
    const { data, error } = await supabase
      .from('booksale')
      .select('price')
      .eq('sellerid', userid)
      .eq('status', 'FINALIZADA');
    if (error) throw error;
    let count = await getCountConditional('booksale', 'sellerid', userid);
    return ({
      published: count,
      sold: data.length,
      revenue: data.length > 0 ? data.map(i => i.price).reduce((a, b) => a + b) : 0,
    })
  } catch (e) {
    return ({
      published: 0,
      sold: 0,
      revenue: 0,
    })
  }
}

export async function fetchBookOffersByUser(userid) {
  const { data, error } = await supabase
    .from('bookoffer')
    .select(`
      booksaleid,
      bookofferid,
      deliveryaddress,
      date,
      status,
      account(
        name,
        accountid
      ),
      booksale(
        title,
        author
      )
    `)
    .eq('accountid', userid);
  if (error) return [];
  return data;
}

export async function fetchBookOffersForUser(userid) {
  const { data, error } = await supabase
    .from('booksale')
    .select(`
      booksaleid,
      title,
      author,
      bookoffer!inner(
        bookofferid,
        deliveryaddress,
        date,
        status,
        account(
          name,
          accountid
        )
      )
    `)
    .eq('sellerid', userid);
  if (error) return [];
  return data;
}

export async function fetchBookSalesByUser(userid) {
  try {
    return await fetchByColumn('booksale', 'sellerid', userid);
  } catch (error) {
    return [];
  }
}

export async function fetchBookSaleDetails(booksaleid) {
  const { data, error } = await supabase
    .from('booksale')
    .select(`
      title, 
      author, 
      editorial, 
      year, 
      cover, 
      price, 
      marked, 
      damaged, 
      description,
      status,
      account:sellerid (
        name,
        accountid
      ),
      bookgenre(
        genre
      )
    `)
    .eq('booksaleid', booksaleid)
  if (error) return null;
  return data[0];
}

export async function fetchUserData(userid, select=null) {
  try {
    let storedData = await fetchByColumn('account', 'accountid', userid, select);
    return storedData[0];
  } catch (error) {
    throw error;
  }
}

export async function uncheckedOffers(userid) {
  const { data, error } = await supabase
    .from('booksale')
    .select('bookoffer!inner(status)')
    .eq('sellerid', userid)
    .eq('bookoffer.status', 'PENDIENTE');
  if (error) return 0;
  return data.length;
}

export async function changeOfferStatus(id, newStatus) {
  const { error } = await supabase
    .from('bookoffer')
    .update({ status: newStatus })
    .eq('bookofferid', id);
  if (error) throw error;
}

export async function updateImage(id, newimage) {
  const { error } = await supabase
    .from('booksale')
    .update({ img: newimage })
    .eq('booksaleid', id);
  if (error) throw error;
}

export async function fetchImage(bucket, name) {
  const { data } = await supabase.storage.from(bucket).getPublicUrl(name);
  return data.publicUrl;
}

export async function uploadFile(bucket, path, file) {
  const { data, error } = await supabase.storage.from(bucket).upload(path, file, {
    //upsert: true,
    contentType: 'image/jpeg',
  });
  if (error) {
    console.log('error',error)
  } 
}

export async function getAvatar(userid) {
  let user = await fetchByColumn('account', 'accountid', userid);
  user = user[0];
  let imgLink = await fetchImage('avatars', user.email);
  return imgLink;
}
