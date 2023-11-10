const WebSocket = require('ws');

const keywords = {
'sportcar': ['https://www.hdcarwallpapers.com/walls/nissan_gtr_r35_adv8_mv13-wide.jpg', 
  'https://www.hdcarwallpapers.com/walls/aston_martin_v12_vantage_2022_4k_8k-HD.jpg', 
  'https://www.hdcarwallpapers.com/walls/2023_dodge_challenger_srt_black_ghost-HD.jpg'],
'formula': ['https://www.hdcarwallpapers.com/walls/ferrari_f1_75_2022_formula_1_5k_2-HD.jpg', 
  'https://www.hdcarwallpapers.com/walls/2017_force_india_vjm10_formula_1_car-HD.jpg', 
  'https://motorsporttickets.com/blog/wp-content/uploads/2023/03/1019041774-SUT-20220320-GP2201_000421MS3_0918-1-scaled.jpg'],
'rally': ['https://www.hdcarwallpapers.com/walls/2013_nissan_370z_nismo_gumball_3000_rally-HD.jpg', 
  'https://www.hdcarwallpapers.com/walls/nissan_fairlady_nissan_juke_rally_tribute_concept_2021-HD.jpg', 
  'https://www.hdcarwallpapers.com/walls/2015_ford_fiesta_rally_car-wide.jpg']
};


let MaxThreadCount = 8; 
const server = new WebSocket.Server({ port: 3000 });
console.log("Сервер запущен. Порт 3000");

server.on('connection', (socket) => 
{
  console.log("Пользователь подключился");
  let threadCount = 0; 

  socket.on('message', (keyword) => 
  {
    console.log(`Получено ключевое слово: ${keyword}`);
    const urls = keywords[keyword];
    if (threadCount < MaxThreadCount) 
    {
      threadCount++;

      if (urls) 
      {
        socket.send(JSON.stringify(urls));
      } 
      else 
      {
        socket.send(JSON.stringify(new String('empty')));
      }

      console.log("Запуск потока");
    }
    else 
    {
      console.log('Занято максимальное количество потоков');
    }
  });

  socket.on('close', () => 
  {
    console.log('Пользователь отключился');
  });
});



