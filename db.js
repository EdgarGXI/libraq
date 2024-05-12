import { supabase } from './supabase.ts';

export async function fetchAll(table) {
  try {
    const { data, error } = await supabase.from(table).select();
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
}

export async function insertRow(table, row) {
  try {
    const { status, error } = await supabase.from(table).insert(row);
    if (String(status)[0] !== '2') throw error;
  } catch (error) {
    console.log('Error', error);
    throw error;
  }
}

export async function insertRowReturn(table, row) {
  try {
    const { data, status, error } = await supabase.from(table).insert(row).select();
    if (String(status)[0] !== '2') throw error;
    return data[0];
  } catch (error) {
    console.log('Error', error);
    throw error;
  }
}

export async function fetchByColumn(table, column, value, select=null) {
  try {
    const { data, error } = await supabase.from(table).select(select).eq(column, value);
    if (error) throw error;
    return data;
  } catch (error) {
    console.log('Error', error)
    return null;
  }
}

export async function upsertRow(table, data) {
  try {
    const { status, error } = await supabase
      .from(table)
      .upsert(data);
    if (String(status)[0] !== '2') throw error;
  } catch (error) {
    console.log('Error', error);
    throw error;
  }
}

export async function getCountConditional(table, conditionColumn, conditionValue) {
  try {
    const { count, error } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true })
      .eq(conditionColumn, conditionValue);
    if (error) throw error;
    return count;
  } catch (error) {
    return 0;
  }
}

export async function getSellerStats(userid) {
  try {
    const { data, error } = await supabase
      .from('booksale')
      .select('price')
      .eq('sellerid', userid)
      .eq('status', 'FINALIZADA');
    let count = await getCountConditional('booksale', 'sellerid', userid);
    return ({
      published: count,
      sold: data.length,
      revenue: data.length > 0 ? data.map(i => i.price).reduce((a, b) => a + b) : 0,
    })
  } catch (e) {
    throw e;
  }
}

export async function fetchBookOffersByUser(userid) {
  try {
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
    if (error) throw error;
    return data;
  } catch (error) {
    return [];
  }
}

export async function fetchBookOffersForUser(userid) {
  try {
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
    if (error) throw error;
    return data;
  } catch (error) {
    console.log('Error', error)
    return [];
  }
}

export async function fetchBookSalesByUser(userid) {
  try {
    return await fetchByColumn('booksale', 'sellerid', userid);
  } catch (error) {
    return [];
  }
}

export async function fetchBookSaleDetails(booksaleid) {
  try {
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
    if (error) throw error;
    return data[0];
  } catch (error) {
    return null;
  }
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
  try {
    const { data, error } = await supabase
      .from('booksale')
      .select('bookoffer!inner(status)')
      .eq('sellerid', userid)
      .eq('bookoffer.status', 'PENDIENTE');
    if (error) throw error;
    return data.length;
  } catch (error) {
    return 0;
  }
}