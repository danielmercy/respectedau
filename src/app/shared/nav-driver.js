
// document.addEventListener('DOMContentLoaded', () => {

//     // reference the mobile menu ui in a variable m_menu, 
//     // reference the menu button in a variable menu_btn
//     let m_menu = document.querySelector('.mobile-menu');
//     let menu_btn = document.querySelector('#menu-btn');

//     try {
//         menu_btn.addEventListener('click', () => {
//             if(m_menu.classList.contains('hidden')) {
//                 m_menu.classList.remove('hidden');
//                 m_menu.classList.add('visible');
//             } else if(m_menu.classList.contains('visible')) {
//                 m_menu.classList.remove('visible');
//                 m_menu.classList.add('hidden');
//             } else {
//                 console.error("An error occurred while trying to work the menu!!");
                
//             }
//         })
//     } catch (error) {
//         console.warn(error)
//     }
// });

// // setInterval(() => {
// //     let m_menu = document.querySelector('.mobile-menu');
// //     let menu_btn = document.querySelector('#menu-btn');

// //     menu_btn.addEventListener('click', () => {
// //         if(m_menu.classList.contains('hidden')) {
// //             m_menu.classList.remove('hidden');
// //             m_menu.classList.add('visible');
// //         } else if(m_menu.classList.contains('visible')) {
// //             m_menu.classList.remove('visible');
// //             m_menu.classList.add('hidden');
// //         } else {
// //             console.error("An error occurred while trying to work the menu!!");
            
// //         }
// //     })
// // }, 5000);