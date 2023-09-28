import axios from 'axios';

export const performApiRequest = async (token) => {
  const headers = {
    'Content-Type': 'application/json',
    signature: 'abcdefghijklmnopQRSTUVWXYz!@#$%&*()0987654321',
  };

  const params = {
    token: token,
  };

  try {
    const response = await axios?.get('https://learningpitch.com/api/batch_courses/test', {
      headers: headers,
      params: params,
    });

    if (response?.data) {
      const courses = [];

      response?.data?.user_enrollment.forEach((enroll) => {
        enroll?.courses.forEach((ecourses) => {
          courses.push(ecourses?.course?.title)
        })
      });

      console.log('Data from API:', courses);
      return new Promise.resolve(courses);
    } else {
      console.log('No data found in the API response');
    return new Promise.reject("No data found")
    }
  } catch (error) {

    console.error('Error:', error);
  }
};


// export const batchchaptersRequest = async (token) => {
//   const headers = {
//     'Content-Type': 'application/json',
//     signature: 'abcdefghijklmnopQRSTUVWXYz!@#$%&*()0987654321',
//   }
  
//   const params = {
//     token: token,
//   };

//   try{
//     const response = await axios?.get('', {headers: headers, params: params})
//   }
// }
