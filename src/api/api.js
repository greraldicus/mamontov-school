const baseURL = "https://parma-coworking.ru";
const prefixOne = 'api_v1';

import router from "../router";
import { isAuthenticated } from "@/utils/authUtils";
import { getCookie } from "@/utils/authUtils";

async function authenticateUser(login, password) {
  let options = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `username=${login}&password=${password}`
  }

  return fetch(`${baseURL}/${prefixOne}/auth/login`, options)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(response.status);
    }
  })
}

async function getPersonInfo() {
  if (!isAuthenticated()) {
    router.push('/auth');
  }
  else {
  let accessToken = getCookie('access-token');
  let options = {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
  }
  return fetch(`${baseURL}/${prefixOne}/me`, options) // TODO: УБРАТЬ personId, добавлять токен
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(response.status);
    }
  })
  }
}

async function getPersonInfoById(id) {
  if (!isAuthenticated()) {
    router.push('/auth');
  }
  else {
  let accessToken = getCookie('access-token');
  let options = {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
  }
  return fetch(`${baseURL}/${prefixOne}/get_person_info?person_id=${id}`, options)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(response.status);
    }
  })
  }
}

async function getPersons() {
  if (!isAuthenticated()) {
    router.push('/auth');
  }
  else {
  let accessToken = getCookie('access-token');
  let options = {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
  }
  return fetch(`${baseURL}/${prefixOne}/get_persons`, options)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(response.status);
    }
  })
  }
}

async function getAccountsByPersonId(id) {
  if (!isAuthenticated()) {
    router.push('/auth');
  }
  else {
    let accessToken = getCookie('access-token');
    let options = {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    }
    return fetch(`${baseURL}/${prefixOne}/users/get_accounts_by_person_id?person_id=${id}`, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
  }
}

async function updateUserCredentials(login, password, user_id) {
  if (!isAuthenticated()) {
    router.push('/auth');
  }
  else {
    let accessToken = getCookie('access-token');
    let options = {
      method: 'PATCH',
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: {
        [login]: login,
        [password]: password,
        [user_id]: user_id
      }
    }
    return fetch(`${baseURL}/${prefixOne}/users/update_user_credentials`, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
  }
}


export {
  authenticateUser,
  getPersonInfo,
  getPersonInfoById,
  getPersons,
  getAccountsByPersonId,
  updateUserCredentials
}