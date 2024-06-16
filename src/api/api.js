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

async function deleteUser(userId) {
  if (!isAuthenticated()) {
    router.push('/auth');
  }
  else {
    let accessToken = getCookie('access-token');
    let options = {
      method: 'DELETE',
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    }
    return fetch(`${baseURL}/${prefixOne}/users/delete_user?user_id=${userId}`, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
  }
}

async function registerUser(login_, password_, personId) {
  if (!isAuthenticated()) {
    router.push('/auth');
  }
  else {
    let accessToken = getCookie('access-token');
    let options = {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        person_id: personId,
        role_id: 2,
        login: login_,
        password: password_,
      })
    }
    return fetch(`${baseURL}/${prefixOne}/auth/register`, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
  }
}

async function updateUserCredentials(login_, password_, user_id_) {
  if (!isAuthenticated()) {
    router.push('/auth');
  }
  else {
    let accessToken = getCookie('access-token');
    let options = {
      method: 'PATCH',
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        login: login_,
        password: password_,
        user_id: user_id_
      })
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

async function createPerson(name, surname, patronymic, birthdate, imgUrl, tenrId) {
  if (!isAuthenticated()) {
    router.push('/auth');
  }
  else {
    let accessToken = getCookie('access-token');
    let options = {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prsn_name: name,
        prsn_surname: surname,
        prsn_patronymic: patronymic,
        prsn_birth_date: birthdate,
        prsn_img_url: imgUrl,
        prsn_tenr_id: tenrId
      })
    }
    return fetch(`${baseURL}/${prefixOne}/create_person`, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
  }
}

async function updatePerson(name, surname, patronymic, birthdate, imgUrl, tenrId, prsnId) {
  if (!isAuthenticated()) {
    router.push('/auth');
  }
  else {
    let accessToken = getCookie('access-token');
    let options = {
      method: 'PUT',
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prsn_name: name,
        prsn_surname: surname,
        prsn_patronymic: patronymic,
        prsn_birth_date: birthdate,
        prsn_img_url: imgUrl,
        prsn_tenr_id: tenrId,
        prsn_id: prsnId
      })
    }
    return fetch(`${baseURL}/${prefixOne}/update_person`, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
  }
}

async function deletePerson(personId) {
  if (!isAuthenticated()) {
    router.push('/auth');
  }
  else {
    let accessToken = getCookie('access-token');
    let options = {
      method: 'DELETE',
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    }
    return fetch(`${baseURL}/${prefixOne}/delete_person?person_id=${personId}`, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
  }
}

async function getTenures(tenrTitleLike) {
  if (!isAuthenticated()) {
    router.push('/auth');
  }
  else {
    let accessToken = getCookie('access-token');
    let options = {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        // 'Authorization': `Bearer ${accessToken}`
      },
    }
    return fetch(`${baseURL}/${prefixOne}/get_tenures?tenr_title__like=${tenrTitleLike}`, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
  }
}

async function getTenureInfo(tenrId) {
  if (!isAuthenticated()) {
    router.push('/auth');
  }
  else {
    let accessToken = getCookie('access-token');
    let options = {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        // 'Authorization': `Bearer ${accessToken}`
      },
    }
    return fetch(`${baseURL}/${prefixOne}/get_tenure_info?tenure_id=${tenrId}`, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
  }
}

async function uploadFile(file) {
  if (!isAuthenticated()) {
    router.push('/auth');
  }
  else {
    let formData = new FormData();
    formData.append('file', file, file.name);
    let accessToken = getCookie('access-token');
    let options = {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: formData
    }

    return fetch(`${baseURL}/${prefixOne}/files/upload`, options) 
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
  }
}

async function downloadFile(fileName) {
  if (!isAuthenticated()) {
    router.push('/auth');
  }
  else {
    let accessToken = getCookie('access-token');
    let options = {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      }
    }

    return fetch(`${baseURL}/${prefixOne}/files/download/${fileName}`, options) 
    .then(response => {
      if (response.ok) {
        return response.blob();
      } else {
        throw new Error(response.status);
      }
    })
  }
}

async function getWorkplaces() {
  if (!isAuthenticated()) {
    router.push('/auth');
  }
  else {
    let options = {
      method: 'GET',
      headers: {
        'accept': 'application/json',
      },
    }
    return fetch(`${baseURL}/${prefixOne}/get_workplaces`, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
  }
}

async function getWorkplacesByFloorId(floorId) {
  if (!isAuthenticated()) {
    router.push('/auth');
  }
  else {
    let options = {
      method: 'GET',
      headers: {
        'accept': 'application/json',
      },
    }
    return fetch(`${baseURL}/${prefixOne}/get_workplaces_by_map_id?map_id=${floorId}`, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
  }
}

async function getWorkplaceInfo(workplaceId) {
  if (!isAuthenticated()) {
    router.push('/auth');
  }
  else {
    let options = {
      method: 'GET',
      headers: {
        'accept': 'application/json',
      },
    }
    return fetch(`${baseURL}/${prefixOne}/get_workplace_info?wp_id=${workplaceId}`, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
  }
}

async function getAttributesByWorkplaceId(workplaceId) {
  if (!isAuthenticated()) {
    router.push('/auth');
  }
  else {
    let options = {
      method: 'GET',
      headers: {
        'accept': 'application/json',
      },
    }
    return fetch(`${baseURL}/${prefixOne}/get_attributes_by_workplace_id?wp_id=${workplaceId}`, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
  }
}

async function deleteWorkplace(workplaceId) {
  if (!isAuthenticated()) {
    router.push('/auth');
  }
  else {
    let accessToken = getCookie('access-token');
    let options = {
      method: 'DELETE',
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    }
    return fetch(`${baseURL}/${prefixOne}/delete_workplace?workplace_id=${workplaceId}`, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
  }
}

async function deleteWorkplaceAttribute(workplaceAttrId) {
  if (!isAuthenticated()) {
    router.push('/auth');
  }
  else {
    let accessToken = getCookie('access-token');
    let options = {
      method: 'DELETE',
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    }
    return fetch(`${baseURL}/${prefixOne}/delete_workplace_attribute?wptypeattr_wp_id=${workplaceAttrId}`, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
  }
}

async function createWorkplace(wpAddress, wpImgUrl, wpTypeId, wpOfficeId, wpAttributesId,
wpCoords, wpFloorId
) {
  if (!isAuthenticated()) {
    router.push('/auth');
  }
  else {
    let accessToken = getCookie('access-token');
    let options = {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        wp_address: wpAddress,
        wp_img_url: wpImgUrl,
        wp_wptype_id: wpTypeId,
        wp_of_id: wpOfficeId,
        wp_x_coord: Math.ceil(wpCoords.x),
        wp_y_coord: Math.ceil(wpCoords.y),
        wp_mp_id: wpFloorId,
        wp_attributes_id: wpAttributesId
      })
    }
    return fetch(`${baseURL}/${prefixOne}/create_workplace`, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
  }
}

async function getOffices() {
  if (!isAuthenticated()) {
    router.push('/auth');
  }
  else {
  let options = {
    method: 'GET',
    headers: {
      'accept': 'application/json',
    },
  }
  return fetch(`${baseURL}/${prefixOne}/offices/get_offices`, options)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(response.status);
    }
  })
  }
}

async function getMaps(officeId) {
  if (!isAuthenticated()) {
    router.push('/auth');
  }
  else {
  let options = {
    method: 'GET',
    headers: {
      'accept': 'application/json',
    },
  }
  return fetch(`${baseURL}/${prefixOne}/maps/get_maps_by_office_id?office_id=${officeId}`, options)
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
  updateUserCredentials,
  registerUser,
  deleteUser,
  createPerson,
  updatePerson,
  deletePerson,
  getTenures,
  getTenureInfo,
  uploadFile,
  downloadFile,
  getWorkplaces,
  getWorkplacesByFloorId,
  getWorkplaceInfo,
  getAttributesByWorkplaceId,
  deleteWorkplace,
  createWorkplace,
  deleteWorkplaceAttribute,
  getOffices,
  getMaps
}