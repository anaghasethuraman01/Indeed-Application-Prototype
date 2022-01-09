
// exports.getReviews = (callback) => {
//     Restaurant.find().then(result => {
//         console.log('Restaurants',result);
//         let respData = {
//             code:'200',
//             msg: 'success'
//         }
//         let n = result.length;
//         if(n==0) {
//             respData.msg='404';
//         }
//         else
//             respData.row = result;
//         callback(null,respData);
//     }).catch(err=> {
//         callback('Failed to get restaurant details',respData);
//     })
// }
