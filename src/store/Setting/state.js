const state = {
  storageUrl: "https://S3.wasabisys.com/agpaiidigital.org",
  // url: process.env.DEV ? 'http://localhost:8000' : 'https://agpaiidigital.org',
  // url: process.env.DEV ? 'http://192.168.56.1:8000' : 'https://agpaiidigital.org',
  url: 'https://agpaiidigital.org',

  // chatUrl: process.env.DEV ? 'http://localhost:8001' : 'http://phpstack-530371-1759159.cloudwaysapps.com',
  // chatUrl: process.env.DEV ? 'http://192.168.56.1:8001' : 'http://phpstack-530371-1759159.cloudwaysapps.com',
  chatUrl: 'http://phpstack-530371-1759159.cloudwaysapps.com',
  // url: process.env.DEV ? 'http://192.168.56.1:8000' : 'https://agpaiidigital.org',
  // url: 'https://agpaiidigital.org',
  // socketUrl: process.env.DEV ? 'http://localhost:3000': 'http://phpstack-530371-1690101.cloudwaysapps.com', // `/chat` sbg namespace
  socketUrl: 'http://phpstack-530371-1690101.cloudwaysapps.com', // `/chat` sbg namespace
  assets:{
    bgToolbar: "statics/bg-toolbar.jpeg"
  },
  count: {},
  isQuestionnary: true,
}

export default state
