import { Component, useEffect, useMemo, useState } from 'react'
import './App.css'
import { cricketerProfiles, quizQuestions } from './cricketerProfiles'
import { spreadsheetCareerTimelines } from './careerTimelines'
import { iplTeams } from './iplTeams'

const players = {
  kohli: {
    name: 'Virat Kohli',
    number: '18',
    subtitle: 'Career, influence, legacy',
    theme: 'kohli',
    range: '2008-2024',
    nodes: [
      { title: 'Delhi early life', year: '1988', tag: 'Origin', frame: 40 },
      { title: 'U19 World Cup', year: '2008', tag: 'Launch', frame: 80 },
      { title: 'India national team', year: '2008', tag: 'India', frame: 120 },
      { title: 'ODI World Cup', year: '2011', tag: 'Champion', frame: 170 },
      { title: 'Champions Trophy', year: '2013', tag: 'Champion', frame: 210 },
      { title: 'RCB captaincy', year: '2013', tag: 'Franchise', frame: 250 },
      { title: 'RCB Peak', year: '2016', tag: 'Network', frame: 300 },
      { title: 'Awards sweep', year: '2018', tag: 'Peak', frame: 350 },
      { title: 'Pressure knocks', year: '2022', tag: 'Rivalry', frame: 395 },
      { title: 'Records and consistency', year: '2023', tag: 'Data', frame: 440 },
      { title: 'Global influence', year: '2023', tag: 'Fans', frame: 485 },
      { title: 'T20 WC legacy moment', year: '2024', tag: 'Legacy', frame: 530 },
      { title: 'RCB IPL title', year: '2025', tag: 'Franchise win', frame: 575 },
    ],
    bars: [
      { year: '2008', label: 'U19', value: 31, frame: 60 },
      { year: '2011', label: 'WC', value: 48, frame: 105 },
      { year: '2013', label: 'CT', value: 58, frame: 150 },
      { year: '2016', label: 'RCB peak', value: 82, frame: 195 },
      { year: '2018', label: 'Awards', value: 92, frame: 240 },
      { year: '2022', label: '82* Pak', value: 77, frame: 285 },
      { year: '2023', label: 'ODI 100s', value: 96, frame: 330 },
      { year: '2024', label: 'T20 WC', value: 90, frame: 375 },
      { year: '2025', label: 'RCB title', value: 98, frame: 420 },
    ],
    portals: [
      'Sports documentary',
      'Hall of fame',
      'ESPN visualization',
      'Legacy analysis',
      'Fan engagement',
      'AI storytelling',
    ],
  },
  pandey: {
    name: 'Manish Pandey',
    number: '37',
    subtitle: 'Influential events timeline',
    theme: 'pandey',
    range: '2004-2024',
    nodes: [
      { title: 'Bangalore pathway', year: '2004', tag: 'Foundation', frame: 40 },
      { title: 'India U19 World Cup', year: '2008', tag: 'Launch', frame: 80 },
      { title: 'First Indian IPL 100', year: '2009', tag: 'Breakthrough', frame: 120 },
      { title: 'Karnataka run machine', year: '2010', tag: 'Domestic', frame: 160 },
      { title: 'KKR final 94', year: '2014', tag: 'Title', frame: 205 },
      { title: 'India debut', year: '2015', tag: 'International', frame: 250 },
      { title: 'Sydney 104*', year: '2016', tag: 'Signature', frame: 295 },
      { title: 'Asia Cup squad', year: '2018', tag: 'India', frame: 340 },
      { title: 'Karnataka captain', year: '2021', tag: 'Leadership', frame: 390 },
      { title: 'KKR return', year: '2024', tag: 'Return', frame: 440 },
      { title: 'Veteran T20 value', year: '2024', tag: 'Legacy', frame: 490 },
    ],
    bars: [
      { year: '2008', label: 'U19', value: 38, frame: 60 },
      { year: '2009', label: 'IPL 100', value: 82, frame: 105 },
      { year: '2014', label: 'KKR 94', value: 94, frame: 150 },
      { year: '2015', label: 'Debut', value: 58, frame: 195 },
      { year: '2016', label: '104*', value: 88, frame: 240 },
      { year: '2018', label: 'Asia Cup', value: 63, frame: 285 },
      { year: '2021', label: 'Captain', value: 66, frame: 330 },
      { year: '2024', label: 'KKR', value: 70, frame: 375 },
    ],
    portals: [
      'U19 pathway',
      'IPL breakthrough',
      'Domestic strength',
      'Middle-order role',
      'Leadership arc',
      'Franchise return',
    ],
  },
  dhoni: {
    name: 'MS Dhoni',
    number: '7',
    subtitle: 'Captaincy, finishing, calm',
    theme: 'dhoni',
    range: '2004-2020',
    nodes: [
      { title: 'Ranchi roots', year: '1981', tag: 'Origin', frame: 40, detail: 'Started outside the traditional metro cricket spotlight and built a distinctive wicketkeeper-batter path.' },
      { title: 'India debut', year: '2004', tag: 'India', frame: 80, detail: 'Entered the senior side as a powerful wicketkeeper-batter with a different tempo.' },
      { title: 'Vizag 148', year: '2005', tag: 'Arrival', frame: 120, detail: 'The 148 against Pakistan announced his attacking range and made him impossible to ignore.' },
      { title: 'ODI 183*', year: '2005', tag: 'Record', frame: 160, detail: 'His unbeaten 183 against Sri Lanka became one of the defining early Dhoni innings.' },
      { title: 'T20 World Cup', year: '2007', tag: 'Captain', frame: 205, detail: 'Led a young India side to the inaugural T20 World Cup and changed his leadership profile overnight.' },
      { title: 'CSK era begins', year: '2008', tag: 'Franchise', frame: 250, detail: 'Became the long-term tactical and emotional center of Chennai Super Kings.' },
      { title: 'World Cup six', year: '2011', tag: 'Legacy', frame: 295, detail: 'Finished the 2011 World Cup final with the image that defines his big-match mythology.' },
      { title: 'Champions Trophy', year: '2013', tag: 'Treble', frame: 340, detail: 'Completed a rare set of major ICC captaincy titles with the 2013 Champions Trophy.' },
      { title: 'Keeper-finisher model', year: '2016', tag: 'Role', frame: 390, detail: 'His calm finishing and wicketkeeping control became a template for modern white-ball balance.' },
      { title: 'Last India chapter', year: '2019', tag: 'Finale', frame: 440, detail: 'Closed his India playing arc after one more World Cup campaign and years of tactical influence.' },
      { title: 'CSK titles continue', year: '2023', tag: 'Aura', frame: 490, detail: 'Extended his franchise legacy through leadership, selection instinct, and crowd connection.' },
    ],
    bars: [
      { year: '2004', label: 'Debut', value: 42, frame: 60 },
      { year: '2005', label: '183*', value: 76, frame: 105 },
      { year: '2007', label: 'T20 WC', value: 88, frame: 150 },
      { year: '2008', label: 'CSK', value: 80, frame: 195 },
      { year: '2011', label: 'WC', value: 98, frame: 240 },
      { year: '2013', label: 'CT', value: 94, frame: 285 },
      { year: '2019', label: 'Final run', value: 70, frame: 330 },
      { year: '2023', label: 'CSK aura', value: 92, frame: 375 },
    ],
    portals: ['Captaincy calm', 'Finishing craft', 'CSK identity', 'Keeper tactics', 'ICC titles', 'Mass fandom'],
  },
  rohit: {
    name: 'Rohit Sharma',
    number: '45',
    subtitle: 'Opening, captaincy, timing',
    theme: 'rohit',
    range: '2007-2024',
    nodes: [
      { title: 'Mumbai pathway', year: '2006', tag: 'Origin', frame: 40, detail: 'Built his game through Mumbai cricket before becoming an India white-ball fixture.' },
      { title: 'India debut', year: '2007', tag: 'India', frame: 80, detail: 'Arrived in the national setup as a gifted middle-order batting prospect.' },
      { title: 'T20 World Cup', year: '2007', tag: 'Champion', frame: 120, detail: 'Was part of India’s first T20 World Cup-winning squad at the start of his international career.' },
      { title: 'Opener switch', year: '2013', tag: 'Reinvention', frame: 170, detail: 'The move to opening unlocked his tempo, range, and long-innings identity.' },
      { title: 'ODI 264', year: '2014', tag: 'Record', frame: 210, detail: 'Scored 264, the highest individual ODI score, making his ceiling feel almost cinematic.' },
      { title: 'MI captaincy', year: '2015', tag: 'Franchise', frame: 250, detail: 'Turned Mumbai Indians leadership into a major part of his public reputation.' },
      { title: 'World Cup five tons', year: '2019', tag: 'Peak', frame: 300, detail: 'Hit five centuries in the 2019 World Cup, a rare tournament-long batting surge.' },
      { title: 'India captain', year: '2022', tag: 'Leader', frame: 350, detail: 'Took the central India captaincy role and shaped a more aggressive team identity.' },
      { title: 'Aggressive reset', year: '2023', tag: 'Tempo', frame: 400, detail: 'Reframed his ODI role around high-tempo starts and powerplay pressure.' },
      { title: 'T20 WC title', year: '2024', tag: 'Legacy', frame: 450, detail: 'Led India to a T20 World Cup title, strengthening his captaincy legacy.' },
      { title: 'Modern opener icon', year: '2024', tag: 'Influence', frame: 500, detail: 'Settled into the modern opener archetype: timing, six-hitting, and tactical calm.' },
    ],
    bars: [
      { year: '2007', label: 'Debut', value: 42, frame: 60 },
      { year: '2013', label: 'Opener', value: 78, frame: 105 },
      { year: '2014', label: '264', value: 96, frame: 150 },
      { year: '2015', label: 'MI lead', value: 86, frame: 195 },
      { year: '2019', label: '5 tons', value: 94, frame: 240 },
      { year: '2022', label: 'Captain', value: 82, frame: 285 },
      { year: '2023', label: 'Tempo', value: 90, frame: 330 },
      { year: '2024', label: 'T20 WC', value: 98, frame: 375 },
    ],
    portals: ['Opening rhythm', 'Mumbai leadership', 'Six-hitting', 'World Cup peaks', 'Tactical calm', 'Team tempo'],
  },
  bumrah: {
    name: 'Jasprit Bumrah',
    number: '93',
    subtitle: 'Pace, precision, disruption',
    theme: 'bumrah',
    range: '2013-2024',
    nodes: [
      { title: 'Gujarat rise', year: '2013', tag: 'Origin', frame: 40, detail: 'Moved from domestic promise into a profile shaped by unusual mechanics and control.' },
      { title: 'MI breakthrough', year: '2013', tag: 'Franchise', frame: 80, detail: 'Mumbai Indians gave him a major T20 platform and exposed his death-bowling value.' },
      { title: 'India T20 debut', year: '2016', tag: 'India', frame: 120, detail: 'Entered India’s limited-overs attack with yorkers, pace, and immediate tactical clarity.' },
      { title: 'Death overs role', year: '2017', tag: 'Specialist', frame: 170, detail: 'Became a go-to late-innings bowler when margins were smallest.' },
      { title: 'Test debut', year: '2018', tag: 'Red ball', frame: 210, detail: 'Translated a white-ball reputation into Test cricket impact away from home.' },
      { title: 'Overseas spells', year: '2018', tag: 'Strike', frame: 250, detail: 'Built credibility through decisive spells in South Africa, England, and Australia cycles.' },
      { title: 'World Cup spearhead', year: '2019', tag: 'Attack', frame: 300, detail: 'Led India’s pace attack on the World Cup stage with economy and wicket threat.' },
      { title: 'Injury rebuild', year: '2022', tag: 'Resilience', frame: 350, detail: 'A major injury phase made his comeback as important as his rise.' },
      { title: 'Asia Cup return', year: '2023', tag: 'Return', frame: 400, detail: 'Returned to high-level cricket and restored the balance of India’s bowling attack.' },
      { title: 'T20 WC dominance', year: '2024', tag: 'Champion', frame: 450, detail: 'Delivered a title-defining T20 World Cup campaign built on precision under pressure.' },
      { title: 'Modern pace template', year: '2024', tag: 'Legacy', frame: 500, detail: 'Represents the modern fast bowler: tactical, adaptable, and trusted in every phase.' },
    ],
    bars: [
      { year: '2013', label: 'MI', value: 50, frame: 60 },
      { year: '2016', label: 'India', value: 68, frame: 105 },
      { year: '2017', label: 'Death', value: 82, frame: 150 },
      { year: '2018', label: 'Tests', value: 88, frame: 195 },
      { year: '2019', label: 'WC', value: 90, frame: 240 },
      { year: '2022', label: 'Rebuild', value: 58, frame: 285 },
      { year: '2023', label: 'Return', value: 78, frame: 330 },
      { year: '2024', label: 'T20 WC', value: 99, frame: 375 },
    ],
    portals: ['Yorker craft', 'Death bowling', 'Test pace', 'Comeback story', 'World Cup pressure', 'Tactical control'],
  },
}

const eventDetails = {
  'Delhi early life': 'Born in Delhi and developed through local cricket before entering national age-group systems.',
  'U19 World Cup': 'Captained India U19 to the 2008 title, creating the first major public signal of his leadership arc.',
  'India national team': 'Moved into the senior India setup and started building the chase-focused batting identity.',
  'ODI World Cup': 'Part of India’s 2011 World Cup-winning squad, adding an early senior global title to his profile.',
  'Champions Trophy': 'Helped India win the 2013 Champions Trophy during a phase where his white-ball influence accelerated.',
  'RCB captaincy': 'Became the central face of RCB leadership, carrying a high-visibility franchise role for years.',
  'RCB Peak': 'The 2016 IPL season became a defining franchise peak, built around volume scoring and fan attention.',
  'Awards sweep': 'The 2018 graphic now maps to Kohli’s award-heavy peak: ICC recognition, elite Test form, and all-format dominance.',
  'Pressure knocks': 'Signature high-pressure innings, including the 82* against Pakistan, reinforced his chase-master reputation.',
  'Records and consistency': 'Reached landmark ODI century territory and became a benchmark for modern batting consistency.',
  'Global influence': 'Expanded beyond cricket output into fitness standards, brand power, and global fan engagement.',
  'T20 WC legacy moment': 'Closed a major T20 chapter with a title-winning legacy moment for India.',
  'RCB IPL title': 'RCB’s 2025 IPL title finally gave Kohli’s long franchise story the championship chapter fans had waited for.',
  'Bangalore pathway': 'Came through Karnataka and Bangalore cricket systems before national age-group visibility.',
  'India U19 World Cup': 'Shared the 2008 India U19 platform that launched several future senior and IPL careers.',
  'First Indian IPL 100': 'Became the first Indian player to score an IPL century, instantly changing his franchise profile.',
  'Karnataka run machine': 'Built long-term credibility through domestic consistency for Karnataka.',
  'KKR final 94': 'Played a decisive 94 in the 2014 IPL final, one of the clearest high-stakes knocks of his career.',
  'India debut': 'Entered the senior India setup as a middle-order batting option.',
  'Sydney 104*': 'Scored an unbeaten ODI century in Sydney, his signature international batting performance.',
  'Asia Cup squad': 'Remained in India’s white-ball conversation through squad roles and middle-order depth.',
  'Karnataka captain': 'Added leadership responsibility through Karnataka captaincy and domestic experience.',
  'KKR return': 'Returned to KKR as an experienced T20 batting option.',
  'Veteran T20 value': 'Settled into a veteran profile shaped by fielding, middle-order skill, and franchise utility.',
}

const featuredAnimations = Object.values(players).reduce((animations, player) => {
  animations[player.name] = player
  return animations
}, {})

const knownJerseyNumbers = {
  'Abhishek Sharma': '4',
  'Ajinkya Rahane': '3',
  'Arshdeep Singh': '2',
  'Axar Patel': '20',
  'Bhuvneshwar Kumar': '15',
  'Devdutt Padikkal': '19',
  'Hardik Pandya': '33',
  'Harshal Patel': '36',
  'Heinrich Klaasen': '45',
  'Ishan Kishan': '23',
  'Jasprit Bumrah': '93',
  'Jitesh Sharma': '99',
  'Jos Buttler': '63',
  'KL Rahul': '1',
  'Krunal Pandya': '24',
  'Kuldeep Yadav': '23',
  'MS Dhoni': '7',
  'Manish Pandey': '37',
  'Mitchell Marsh': '8',
  'Mohammad Siraj': '73',
  'Mohammed Shami': '11',
  'Nicholas Pooran': '29',
  'Pat Cummins': '30',
  'Prasidh Krishna': '24',
  'Rajat Patidar': '97',
  'Rashid Khan': '19',
  'Ravindra Jadeja': '8',
  'Rinku Singh': '35',
  'Rishabh Pant': '17',
  'Rohit Sharma': '45',
  'Ruturaj Gaikwad': '31',
  'Sam Curran': '58',
  'Sanju Samson': '9',
  'Shardul Thakur': '54',
  'Shreyas Iyer': '41',
  'Shubman Gill': '77',
  'Suryakumar Yadav': '63',
  'Tim David': '8',
  'Travis Head': '62',
  'Trent Boult': '18',
  'Varun Chakaravarthy': '29',
  'Virat Kohli': '18',
  'Washington Sundar': '5',
  'Yashasvi Jaiswal': '64',
  'Yuzvendra Chahal': '3',
}

const roleOrder = {
  batter: 1,
  keeper: 2,
  allrounder: 3,
  bowler: 4,
}

const roleLabels = {
  batter: 'Batter',
  keeper: 'Keeper-batter',
  allrounder: 'All-rounder',
  bowler: 'Bowler',
}

const wicketkeepers = new Set([
  'Abhishek Porel',
  'Anuj Rawat',
  'Dhruv Jurel',
  'Donovan Ferreira',
  'Heinrich Klaasen',
  'Ishan Kishan',
  'Jitesh Sharma',
  'Jos Buttler',
  'KL Rahul',
  'Kumar Kushagra',
  'Lhuan-Dre Pretorius',
  'MS Dhoni',
  'Matthew Breetzke',
  'Nicholas Pooran',
  'Phil Salt',
  'Prabhsimran Singh',
  'Quinton de Kock',
  'Rishabh Pant',
  'Robin Minz',
  'Ryan Rickelton',
  'Sanju Samson',
  'Tristan Stubbs',
  'Urvil Patel',
  'Vishnu Vinod',
])

const allrounders = new Set([
  'Ajay Mandal',
  'Anukul Roy',
  'Arjun Tendulkar',
  'Arshin Kulkarni',
  'Axar Patel',
  'Azmatullah Omarzai',
  'Corbin Bosch',
  'Glenn Phillips',
  'Hardik Pandya',
  'Harpreet Brar',
  'Jacob Bethell',
  'Jamie Overton',
  'Jayant Yadav',
  'Kamindu Mendis',
  'Krunal Pandya',
  'Marco Jansen',
  'Marcus Stoinis',
  'Mitchell Marsh',
  'Mitchell Santner',
  'Mohd. Arshad Khan',
  'Nishant Sindhu',
  'Nitish Kumar Reddy',
  'R. Sai Kishore',
  'Rahul Tewatia',
  'Raj Angad Bawa',
  'Ramandeep Singh',
  'Ravindra Jadeja',
  'Romario Shepherd',
  'Sam Curran',
  'Shahbaz Ahmed',
  'Shardul Thakur',
  'Sherfane Rutherford',
  'Shivam Dube',
  'Shreyas Gopal',
  'Sunil Narine',
  'Swapnil Singh',
  'Suryansh Shedge',
  'Washington Sundar',
  'Will Jacks',
])

const bowlers = new Set([
  'Abhinandan Singh',
  'Akash Singh',
  'Allah Ghazanfar',
  'Anshul Kamboj',
  'Arshdeep Singh',
  'Ashwani Kumar',
  'Avesh Khan',
  'Brydon Carse',
  'Bhuvneshwar Kumar',
  'Deepak Chahar',
  'Digvesh Rathi',
  'Dushmantha Chameera',
  'Eshan Malinga',
  'Gurjapneet Singh',
  'Gurnoor Singh Brar',
  'Harshit Rana',
  'Harshal Patel',
  'Ishant Sharma',
  'Jaydev Unadkat',
  'Jofra Archer',
  'Josh Hazlewood',
  'Kagiso Rabada',
  'Khaleel Ahmed',
  'Kuldeep Yadav',
  'Kwena Maphaka',
  'Lockie Ferguson',
  'Manav Suthar',
  'Manimaran Siddharth',
  'Mayank Markande',
  'Mayank Yadav',
  'Mitchell Starc',
  'Mohammad Siraj',
  'Mohammed Shami',
  'Mohsin Khan',
  'Mukesh Choudhary',
  'Mukesh Kumar',
  'Nandre Burger',
  'Nathan Ellis',
  'Noor Ahmad',
  'Nuwan Thushara',
  'Pat Cummins',
  'Prasidh Krishna',
  'Prince Yadav',
  'Raghu Sharma',
  'Ramakrishna Ghosh',
  'Rashid Khan',
  'Rasikh Dar',
  'Sandeep Sharma',
  'Shreyas Gopal',
  'Suyash Sharma',
  'T. Natarajan',
  'Trent Boult',
  'Tripurana Vijay',
  'Tushar Deshpande',
  'Umran Malik',
  'Vaibhav Arora',
  'Varun Chakaravarthy',
  'Vyshak Vijaykumar',
  'Xavier Bartlett',
  'Yash Dayal',
  'Yash Thakur',
  'Yudhvir Charak',
  'Yuzvendra Chahal',
  'Zeeshan Ansari',
])

const playerHighlights = {
  'Abhishek Sharma': {
    debut: 'India T20I debut in 2024 after a high-impact IPL batting season.',
    influence: 'Known for powerplay aggression and left-arm spin utility.',
    best: 'IPL 2024 made him a headline SRH opener through high-tempo starts.',
  },
  'Ajinkya Rahane': {
    debut: 'India debut came in 2011 before he became a long-format batting fixture.',
    influence: 'Gabba 2021 captaincy and overseas Test runs remain major legacy markers.',
    best: 'His 2023 CSK season revived his T20 batting identity through tempo and intent.',
  },
  'Axar Patel': {
    debut: 'India debut in 2014 after strong IPL and domestic all-round returns.',
    influence: 'Influential lower-order runs and left-arm spin control have shaped India and IPL roles.',
    best: 'Recent seasons made him a leadership-grade Delhi all-rounder.',
  },
  'Hardik Pandya': {
    debut: 'India debut in 2016 as a seam-bowling all-rounder.',
    influence: 'Major finishing bursts, Gujarat Titans captaincy, and India T20 leadership define his arc.',
    best: 'IPL 2022 was a peak captaincy season, ending with a Gujarat title.',
  },
  'Jasprit Bumrah': {
    debut: 'India debut in 2016 after Mumbai Indians exposed his death-bowling value.',
    influence: 'Yorkers, Test spells overseas, and 2024 T20 World Cup control define his influence.',
    best: 'His best seasons combine IPL death bowling with title-level India performances.',
  },
  'KL Rahul': {
    debut: 'India Test debut in 2014, followed by all-format wicketkeeper-batter roles.',
    influence: 'Adaptability as opener, middle-order batter, keeper, and IPL leader is his defining value.',
    best: 'Multiple IPL seasons as an elite run accumulator shaped his franchise profile.',
  },
  'MS Dhoni': {
    debut: 'India debut in 2004 before the 2005 Vizag 148 and 183* changed his profile.',
    influence: '2011 World Cup finish, ICC captaincy titles, and CSK leadership define his legend.',
    best: 'His best IPL seasons connect finishing, keeping, captaincy, and CSK title culture.',
  },
  'Pat Cummins': {
    early: 'Raised through New South Wales cricket, Cummins was viewed early as a rare pace prospect because he combined speed, bounce, control, and a mature temperament.',
    debut: 'He made his Test debut as an 18-year-old in 2011 and immediately looked like a long-term strike bowler, even before injuries interrupted the first phase of his career.',
    influence:
      'His influence is enormous: 300-plus Test wickets, elite new-ball and old-ball spells, the 2023 World Test Championship, and captaining Australia to the 2023 ODI World Cup.',
    best: 'His peak seasons are captaincy seasons as much as bowling seasons: 2019 Test excellence, 2023 WTC/Ashes/ODI World Cup leadership, and high-value IPL fast-bowling phases.',
    franchise:
      'For SRH, Cummins is not just a bowler. He is the tone-setter: captain, powerplay option, middle-overs enforcer, death-over decision-maker, and dressing-room standard.',
    timeline: [
      ['Westmead to NSW', '1993', 'Origin', 'Raised in New South Wales, Cummins came through as a rare fast-bowling prospect with pace, bounce, and unusually mature control.'],
      ['Teenage Test debut', '2011', 'Debut', 'Made his Test debut at 18 against South Africa and immediately looked like Australia’s next long-term strike quick before injuries slowed the first phase.'],
      ['Injury rebuild', '2012-2016', 'Resilience', 'Multiple stress injuries forced a long rebuild, making his later durability and leadership arc a major part of the story.'],
      ['Test attack leader', '2017-2019', 'Peak', 'Returned as a complete Test fast bowler and became central to Australia’s pace identity, eventually reaching world No. 1 Test bowler status.'],
      ['300+ Test wickets', '2020s', 'Milestone', 'Moved past 300 Test wickets, joining the elite tier of Australian fast bowlers through repeatable pace, accuracy, and stamina.'],
      ['WTC champion captain', '2023', 'Trophy', 'Captained Australia to the 2023 World Test Championship title against India, adding a global red-ball trophy to his leadership resume.'],
      ['ODI World Cup captain', '2023', 'World Cup', 'Led Australia to the 2023 ODI World Cup and delivered a major final spell, including the wickets of Virat Kohli and Shreyas Iyer.'],
      ['SRH captaincy lane', '2026', 'IPL', 'For SRH, he is captain and strike bowler: a player who changes both the bowling plan and the emotional temperature of the side.'],
    ],
  },
  'Ruturaj Gaikwad': {
    timeline: [
      ['Pune pathway', '1997', 'Origin', 'Came through Maharashtra cricket as a technically clean top-order batter with timing rather than brute force as the first signal.'],
      ['CSK auction entry', '2019', 'Franchise', 'CSK bought him before the 2019 season, placing him into one of the most stable batting environments in IPL cricket.'],
      ['IPL debut', '2020', 'Debut', 'Made his CSK debut in a difficult 2020 season and ended that campaign with enough late runs to keep the franchise invested.'],
      ['Maiden IPL hundred', '2021', 'Breakthrough', 'Scored an unbeaten 101 against Rajasthan Royals, confirming he could convert starts into match-shaping innings.'],
      ['Orange Cap season', '2021', 'Peak', 'Won the IPL Orange Cap with 635 runs, becoming the season’s leading scorer while CSK went on to win the title.'],
      ['Emerging Player award', '2021', 'Award', 'The 2021 season mattered because he was not just productive; he became CSK’s next-generation batting bridge after the old core.'],
      ['590-run season', '2023', 'Consistency', 'Made 590 runs in IPL 2023, keeping CSK’s top order stable through another title-winning campaign.'],
      ['CSK captain', '2024', 'Leader', 'Took over CSK captaincy, turning his batting value into leadership responsibility inside a demanding franchise culture.'],
    ],
  },
  'Travis Head': {
    timeline: [
      ['South Australia rise', '1993', 'Origin', 'Head came through South Australian cricket as an aggressive left-hander trusted early with leadership and high-tempo batting roles.'],
      ['Australia debut phase', '2016', 'Debut', 'Entered Australia’s limited-overs setup before forcing his way into Test calculations through domestic volume and attacking intent.'],
      ['Test middle-order reset', '2021', 'Role', 'Rebuilt his Test career by accepting a counterattacking middle-order identity rather than trying to be a conventional accumulator.'],
      ['WTC final 163', '2023', 'Trophy', 'Scored 163 in the 2023 World Test Championship final and was Player of the Match as Australia beat India.'],
      ['World Cup final 137', '2023', 'World Cup', 'Made 137 in the 2023 ODI World Cup final chase, again against India, turning a final into his signature global innings.'],
      ['Two ICC final tons', '2023', 'Record', 'Became the first player to score centuries in two men’s ICC tournament finals in the same calendar year.'],
      ['SRH powerplay weapon', '2024', 'IPL', 'With SRH, his value became powerplay violence: forcing opponents to defend from ball one and changing match tempo immediately.'],
      ['2026 SRH role', '2026', 'Franchise', 'In this SRH setup, Head remains the high-ceiling opener whose first six overs can define the whole innings.'],
    ],
  },
  'Ishant Sharma': {
    timeline: [
      ['Delhi fast-bowling rise', '1988', 'Origin', 'Ishant emerged from Delhi cricket as a tall, high-release fast bowler capable of steep bounce and long spells.'],
      ['India Test debut', '2007', 'Debut', 'Made his Test debut as a teenager and was quickly asked to carry heavy overs in a developing Indian pace attack.'],
      ['Ponting spell', '2008', 'Memory', 'His spell to Ricky Ponting at Perth became one of the defining early images of his career: pace, bounce, and relentless questioning.'],
      ['100 Test wickets', '2011', 'Milestone', 'Became one of the youngest bowlers to reach 100 Test wickets, even while still learning control at international level.'],
      ['Lord’s 7-for', '2014', 'Iconic spell', 'Took 7 wickets at Lord’s in 2014, a career-defining overseas spell that helped India win a famous Test.'],
      ['Pace-unit veteran', '2018-2021', 'Peak', 'In the Kohli-Shastri pace era, Ishant became a senior control bowler alongside Bumrah and Shami.'],
      ['300 Test wickets', '2021', 'Milestone', 'Reached 300 Test wickets, joining a very small group of Indian fast bowlers to hit that mark.'],
      ['IPL veteran value', '2026', 'Franchise', 'For Gujarat, he profiles as experience: new-ball know-how, defensive fields, and calm support for younger quicks.'],
    ],
  },
  'Cameron Green': {
    early: 'Green emerged from Western Australia as a rare tall seam-bowling all-rounder with top-order batting range.',
    debut: 'His Australia debut phase showed why teams value him: pace-bowling cover, batting ceiling, and fielding reach in one profile.',
    influence: 'His IPL influence includes high-value top-order hitting and the ability to change team balance because he can bat high and bowl seam.',
    best: 'His best T20 windows have come when used with role clarity: top-order license, matchup bowling, and freedom to attack pace.',
    franchise: 'For KKR, Green gives the XI a premium overseas all-rounder route without forcing a one-dimensional selection.',
  },
  'Matheesha Pathirana': {
    early: 'Pathirana came through Sri Lanka as a sling-action fast bowler whose release point immediately separated him from conventional pace prospects.',
    debut: 'His early franchise breakthrough came through death-overs usage, where yorkers, pace changes, and angle made him difficult to line up.',
    influence: 'His most influential spells are usually at the back end of an innings, where wickets and boundary prevention carry equal value.',
    best: 'His best seasons have been role-specific: short bursts, high pressure, and captain trust in overs 16 to 20.',
    franchise: 'For KKR, Pathirana projects as a specialist end-overs weapon who changes how opponents plan the final five overs.',
  },
  'Rishabh Pant': {
    debut: 'India debut in 2017 before becoming a match-changing Test wicketkeeper-batter.',
    influence: 'Gabba 2021, fearless counterattack, and comeback resilience define his profile.',
    best: 'His best seasons blend explosive batting, keeping responsibility, and captaincy expectations.',
  },
  'Rohit Sharma': {
    debut: 'India debut in 2007 before the 2013 opener switch transformed his career.',
    influence: 'ODI 264, five 2019 World Cup hundreds, MI titles, and India captaincy mark his arc.',
    best: 'His best seasons pair elite opening returns with leadership and powerplay tempo.',
  },
  'Shreyas Iyer': {
    debut: 'India debut in 2017 after domestic and IPL run-making.',
    influence: 'Middle-order spin hitting, captaincy, and major tournament batting define his value.',
    best: 'His best seasons combine leadership with high-pressure middle-order runs.',
  },
  'Shubman Gill': {
    debut: 'India debut followed U19 success and a polished top-order rise.',
    influence: 'ODI double hundred, IPL Orange Cap form, and Gujarat captaincy shape his arc.',
    best: 'IPL 2023 was a best-season marker built on volume, timing, and tournament dominance.',
  },
  'Virat Kohli': {
    debut: 'India debut in 2008 after captaining India U19 to the World Cup.',
    influence: 'Chases, ODI hundreds, 2018 all-format peak, 2024 T20 World Cup, and the 2025 RCB title define the arc.',
    best: 'IPL 2016, international 2018, and RCB 2025 are the key peak-season markers.',
  },
}

const internationalCareerTimelines = {
  'Sanju Samson': [
    ['Kerala pathway', '1994', 'Origin', 'Samson came through Kerala cricket as a rare top-order wicketkeeper-batter with timing, range, and early leadership responsibility.'],
    ['IPL teenage signal', '2013', 'Breakthrough', 'His Rajasthan Royals rise made him one of the earliest Indian keeper-batters trusted for top-order IPL intent.'],
    ['India T20I debut', '2015', 'India', 'Made his India T20I debut in 2015, beginning a long stop-start national-team story shaped by competition for keeper-batter roles.'],
    ['IPL captaincy', '2021', 'Leader', 'Rajasthan made him captain, turning him from a high-upside batter into a franchise decision-maker.'],
    ['ODI century', '2023', 'Milestone', 'Scored his first ODI hundred against South Africa, a major proof point that his international ceiling could translate beyond IPL cameos.'],
    ['CSK squad role', '2026', 'Franchise', 'For CSK, Samson changes the roster geometry: top-order batting, keeping cover, and captaincy experience in one player.'],
  ],
  'Dewald Brevis': [
    ['South African prodigy', '2003', 'Origin', 'Brevis emerged as a high-ceiling South African batting prospect with a style often compared to AB de Villiers.'],
    ['U19 World Cup breakout', '2022', 'Breakthrough', 'The 2022 U19 World Cup made him globally visible through volume scoring and 360-degree strokeplay.'],
    ['Franchise acceleration', '2022', 'T20', 'Mumbai Indians and global leagues accelerated his development before he became a regular senior international name.'],
    ['South Africa debut', '2023', 'Debut', 'Made his South Africa T20I debut, moving from prospect label to senior international pathway.'],
    ['Power-hitting value', '2020s', 'Skill', 'His career is built around boundary access, spin-hitting confidence, and the ability to change tempo quickly.'],
    ['CSK fit', '2026', 'Franchise', 'For CSK, Brevis offers a youthful overseas power option who can be protected by a veteran-heavy structure.'],
  ],
  'Matthew Short': [
    ['Victoria pathway', '1995', 'Origin', 'Short came through Australian domestic cricket as a batting all-rounder capable of opening and bowling off-spin.'],
    ['BBL rise', '2020s', 'Domestic', 'His Big Bash form made him a franchise target because he could score quickly and add matchup overs.'],
    ['Australia debut', '2023', 'Debut', 'Made his Australia white-ball debut after sustained domestic T20 returns.'],
    ['Adelaide Strikers peak', '2020s', 'Best season', 'His best BBL seasons combined top-order run volume with useful overs, turning him into a genuine all-round option.'],
    ['Role flexibility', '2026', 'Skill', 'Short’s value is that he can open, float, or cover off-spin depending on team balance.'],
    ['CSK fit', '2026', 'Franchise', 'For CSK, he profiles as a tactical overseas all-rounder rather than a single-role batter.'],
  ],
  'Akeal Hosein': [
    ['Trinidad pathway', '1993', 'Origin', 'Hosein came through West Indies cricket as a left-arm spinner with control, new-ball courage, and lower-order batting value.'],
    ['West Indies debut', '2021', 'Debut', 'Made his West Indies white-ball debut and quickly became trusted in powerplay and middle-over phases.'],
    ['T20 franchise specialist', '2020s', 'Role', 'Built a global T20 profile around economy, angles, and matchup bowling to right-hand-heavy lineups.'],
    ['World Cup cycles', '2020s', 'International', 'His West Indies role has often been about controlling scoring rate while still creating wicket pressure.'],
    ['All-phase spinner', '2026', 'Skill', 'The key value is phase flexibility: he can bowl early, through the middle, or protect a matchup.'],
    ['CSK fit', '2026', 'Franchise', 'For CSK, Hosein gives spin depth and overseas control if conditions reward grip.'],
  ],
  'Matt Henry': [
    ['Canterbury rise', '1991', 'Origin', 'Henry came through New Zealand domestic cricket as a seam bowler with bounce, movement, and relentless Test-match discipline.'],
    ['New Zealand debut', '2014', 'Debut', 'Made his New Zealand debut and became a regular squad option across formats.'],
    ['2019 World Cup final run', '2019', 'Trophy run', 'Was part of New Zealand’s 2019 World Cup final campaign, with new-ball spells central to their attack.'],
    ['Test-match credibility', '2020s', 'Peak', 'His best seasons have come when seam movement and hard lengths made him a red-ball and ODI threat.'],
    ['New-ball role', '2026', 'Skill', 'Henry’s value is early wickets: forcing top-order errors before innings shape settles.'],
    ['CSK fit', '2026', 'Franchise', 'For CSK, Henry gives an overseas seam option with international tournament experience.'],
  ],
  'David Miller': [
    ['Pietermaritzburg pathway', '1989', 'Origin', 'Miller emerged from South African cricket as a left-handed power batter built for finishing and middle-order acceleration.'],
    ['South Africa debut', '2010', 'Debut', 'Made his South Africa debut in 2010 and became a long-running white-ball presence.'],
    ['IPL 101*', '2013', 'Memory', 'His unbeaten 101 for Kings XI Punjab became one of the iconic early IPL finishing innings.'],
    ['Gujarat title season', '2022', 'Trophy', 'Played a major finishing role in Gujarat Titans’ 2022 IPL title campaign.'],
    ['South Africa senior role', '2020s', 'Leader', 'His international value has been calm finishing, boundary hitting, and experience in knockout pressure.'],
    ['DC fit', '2026', 'Franchise', 'For Delhi, Miller supplies late-innings power and a veteran overseas left-hand option.'],
  ],
  'Pathum Nissanka': [
    ['Sri Lanka pathway', '1998', 'Origin', 'Nissanka came through Sri Lanka as a technically strong top-order batter trusted for stability.'],
    ['Test debut hundred', '2021', 'Debut', 'Made a Test hundred on debut against West Indies, immediately validating his international temperament.'],
    ['White-ball anchor', '2020s', 'Role', 'Became a key Sri Lanka white-ball opener through repeatable starts and controlled strokeplay.'],
    ['ODI double hundred', '2024', 'Milestone', 'Scored Sri Lanka’s first ODI double century, a major individual landmark in national cricket history.'],
    ['Best seasons', '2020s', 'Peak', 'His strongest years have paired ODI volume with T20 adaptability at the top.'],
    ['DC fit', '2026', 'Franchise', 'For Delhi, Nissanka offers a composed overseas top-order option if the XI needs control over volatility.'],
  ],
  'Mitchell Starc': [
    ['New South Wales left-armer', '1990', 'Origin', 'Starc developed as a rare left-arm quick with pace, swing, yorkers, and lower-order hitting.'],
    ['Australia debut', '2010', 'Debut', 'Made his Australia debut in 2010 and grew into one of the defining white-ball fast bowlers of his era.'],
    ['2015 World Cup Player of Tournament', '2015', 'Trophy', 'Was Player of the Tournament as Australia won the 2015 ODI World Cup.'],
    ['World Cup wicket machine', '2019', 'Peak', 'Led the wicket charts at the 2019 World Cup, reinforcing his tournament-bowling reputation.'],
    ['IPL title spell', '2024', 'Franchise', 'Produced major knockout spells for KKR in 2024, showing why left-arm pace is a premium playoff weapon.'],
    ['DC fit', '2026', 'Franchise', 'For Delhi, Starc is a new-ball and death-over strike option with proven tournament pedigree.'],
  ],
  'Lungi Ngidi': [
    ['Durban pace rise', '1996', 'Origin', 'Ngidi came through South African cricket as a tall fast bowler with bounce and seam movement.'],
    ['South Africa debut', '2017', 'Debut', 'Made his international debut and quickly became part of South Africa’s fast-bowling pool.'],
    ['Test impact', '2018', 'Breakthrough', 'Announced himself in Tests with wicket-taking spells against India.'],
    ['CSK title squad', '2018', 'Trophy', 'Was part of Chennai’s 2018 IPL title-winning setup, giving him early franchise-winning experience.'],
    ['White-ball role', '2020s', 'Role', 'His strongest value is hard-length bowling with wicket threat in the middle overs.'],
    ['DC fit', '2026', 'Franchise', 'For Delhi, Ngidi gives overseas pace depth and proven IPL familiarity.'],
  ],
  'Shubman Gill': [
    ['Punjab and U19 rise', '1999', 'Origin', 'Gill came through Punjab cricket and India U19 as a polished top-order batter with elite timing.'],
    ['U19 World Cup winner', '2018', 'Trophy', 'Was Player of the Tournament as India won the 2018 U19 World Cup, making him a national future-star marker.'],
    ['India debut', '2019', 'Debut', 'Made his India debut and gradually moved from prospect to all-format top-order option.'],
    ['Gabba 91', '2021', 'Memory', 'His 91 at the Gabba helped India chase history and became a career-defining Test innings.'],
    ['IPL 2023 Orange Cap', '2023', 'Peak', 'Scored 890 runs in IPL 2023, winning the Orange Cap and carrying Gujarat’s batting to another final.'],
    ['GT captain', '2024', 'Leader', 'Took over Gujarat captaincy, adding tactical and leadership weight to his batting role.'],
  ],
  'Jos Buttler': [
    ['Somerset pathway', '1990', 'Origin', 'Buttler emerged from English cricket as a rare keeper-batter with elite white-ball finishing and opening range.'],
    ['England debut', '2011', 'Debut', 'Made his England debut in 2011 and became central to England’s limited-overs transformation.'],
    ['2019 World Cup winner', '2019', 'Trophy', 'Was England’s wicketkeeper in the 2019 ODI World Cup final win, including the decisive Super Over run-out.'],
    ['IPL 2022 Orange Cap', '2022', 'Peak', 'Scored 863 runs for Rajasthan in IPL 2022, winning the Orange Cap with a run of hundreds.'],
    ['England white-ball captain', '2022', 'Leader', 'Succeeded Eoin Morgan as England’s white-ball captain and led the 2022 T20 World Cup-winning side.'],
    ['GT fit', '2026', 'Franchise', 'For Gujarat, Buttler offers elite opening power, keeping cover, and knockout experience.'],
  ],
  'Kagiso Rabada': [
    ['Johannesburg pace rise', '1995', 'Origin', 'Rabada came through South African cricket as an unusually complete fast bowler: pace, bounce, yorkers, and aggression.'],
    ['South Africa debut', '2014', 'Debut', 'Made his international debut as a teenager and quickly became a multi-format strike bowler.'],
    ['ODI hat-trick debut', '2015', 'Memory', 'Took a hat-trick on ODI debut, one of the clearest early signs of his wicket-taking ceiling.'],
    ['World-class Test quick', '2010s', 'Peak', 'Became one of the leading Test fast bowlers in the world through strike rate and hostility.'],
    ['IPL Purple Cap', '2020', 'Award', 'Won the IPL Purple Cap with Delhi Capitals, proving he could dominate franchise cricket too.'],
    ['GT fit', '2026', 'Franchise', 'For Gujarat, Rabada gives a premium overseas strike option in both powerplay and death phases.'],
  ],
  'Rashid Khan': [
    ['Afghanistan rise', '1998', 'Origin', 'Rashid emerged as Afghanistan’s global cricket symbol: fast-arm leg-spin, googlies, and fearless lower-order hitting.'],
    ['Afghanistan debut', '2015', 'Debut', 'Made his Afghanistan debut as a teenager and rapidly became the face of their T20 rise.'],
    ['IPL arrival', '2017', 'Franchise', 'Joined Sunrisers Hyderabad and immediately became one of the IPL’s hardest bowlers to attack.'],
    ['Global T20 icon', '2010s', 'Peak', 'Built a worldwide league career by combining economy, wickets, fielding, and finishing cameos.'],
    ['GT title season', '2022', 'Trophy', 'Played a central role in Gujarat Titans’ 2022 IPL title-winning campaign.'],
    ['GT fit', '2026', 'Franchise', 'For Gujarat, Rashid remains a tactical centerpiece: middle-over control, late hitting, and leadership aura.'],
  ],
  'Cameron Green': [
    ['Western Australia rise', '1999', 'Origin', 'Green emerged from Western Australia as a rare tall seam-bowling all-rounder with top-order batting range.'],
    ['Australia debut', '2020', 'Debut', 'Made his Australia debut in 2020 and was quickly valued for balancing XIs with both batting and seam overs.'],
    ['Test all-rounder growth', '2021-2023', 'Role', 'Developed through Test cricket as a tall fourth-seamer who could also hold a top-six batting role.'],
    ['IPL hundred for MI', '2023', 'Memory', 'Scored a maiden IPL hundred for Mumbai Indians, proving he could dominate as a top-order T20 batter.'],
    ['RCB/KKR premium value', '2020s', 'Franchise', 'His IPL value is premium because few overseas players combine top-order batting, seam bowling, and fielding reach.'],
    ['KKR fit', '2026', 'Franchise', 'For KKR, Green gives a title-contending XI a flexible overseas all-rounder route.'],
  ],
  'Rachin Ravindra': [
    ['Wellington pathway', '1999', 'Origin', 'Ravindra came through New Zealand cricket as a left-handed batter and left-arm spin all-rounder.'],
    ['New Zealand debut', '2021', 'Debut', 'Made his New Zealand debut in 2021, initially valued for multi-skill balance.'],
    ['World Cup breakout', '2023', 'Breakthrough', 'The 2023 ODI World Cup transformed his profile through top-order hundreds and fearless batting.'],
    ['Test hundred', '2024', 'Milestone', 'Added red-ball weight with major Test runs, showing his game was not just white-ball momentum.'],
    ['CSK exposure', '2024', 'IPL', 'His IPL arrival gave him experience in Indian conditions and franchise pressure.'],
    ['KKR fit', '2026', 'Franchise', 'For KKR, Ravindra offers left-hand batting, spin cover, and a high-upside overseas role.'],
  ],
  'Sunil Narine': [
    ['Trinidad mystery spin', '1988', 'Origin', 'Narine emerged from Trinidad as a mystery spinner with a hard-to-read action and elite T20 control.'],
    ['West Indies debut', '2011', 'Debut', 'Made his West Indies debut and quickly became one of the most difficult white-ball spinners to attack.'],
    ['2012 T20 World Cup', '2012', 'Trophy', 'Was part of West Indies’ 2012 T20 World Cup-winning side, validating his global spin impact.'],
    ['KKR title years', '2012-2014', 'Trophy', 'Was central to KKR’s 2012 and 2014 IPL titles through spin control and wicket pressure.'],
    ['Batting reinvention', '2017-2024', 'Reinvention', 'Reinvented himself as a powerplay hitter, culminating in an MVP-level 2024 IPL season.'],
    ['KKR fit', '2026', 'Franchise', 'For KKR, Narine remains franchise DNA: spin, opening batting disruption, and tactical unpredictability.'],
  ],
  'Rishabh Pant': [
    ['Delhi pathway', '1997', 'Origin', 'Pant came through Delhi cricket as a left-handed wicketkeeper-batter with rare power and improvisation.'],
    ['India debut', '2017', 'Debut', 'Made his India debut in 2017 and quickly became a high-risk, high-reward batting option.'],
    ['Test hundreds overseas', '2018-2019', 'Breakthrough', 'Scored Test hundreds in England and Australia, unusual markers for an Indian keeper-batter.'],
    ['Gabba 89*', '2021', 'Iconic innings', 'His unbeaten 89 at the Gabba sealed one of India’s greatest Test series wins.'],
    ['Injury comeback', '2022-2024', 'Resilience', 'Returned from a serious accident to resume elite cricket, adding comeback weight to his profile.'],
    ['LSG captaincy', '2026', 'Franchise', 'For LSG, Pant is captain, keeper, middle-order disruptor, and emotional center of the squad.'],
  ],
  'Nicholas Pooran': [
    ['Trinidad left-hander', '1995', 'Origin', 'Pooran came through West Indies cricket as a left-handed keeper-batter with elite ball-striking.'],
    ['West Indies debut', '2016', 'Debut', 'Made his West Indies debut and became part of the next generation of Caribbean T20 power.'],
    ['T20 franchise rise', '2010s', 'Franchise', 'Built global value through finishing, spin hitting, and middle-order acceleration across leagues.'],
    ['West Indies captaincy', '2022', 'Leader', 'Captained West Indies in white-ball cricket, adding leadership experience to his batting profile.'],
    ['IPL power seasons', '2020s', 'Peak', 'His best IPL seasons have been defined by high strike-rate middle-order impact for LSG.'],
    ['LSG fit', '2026', 'Franchise', 'For LSG, Pooran is the overseas batting engine who can flip an innings in two overs.'],
  ],
  'Mitchell Marsh': [
    ['Western Australia pathway', '1991', 'Origin', 'Marsh came through a famous Australian cricket family as a seam-bowling all-rounder with top-order power.'],
    ['Australia debut', '2011', 'Debut', 'Made his Australia debut in 2011 and spent years moving between formats and roles.'],
    ['T20 World Cup final 77*', '2021', 'Trophy', 'Made an unbeaten 77 in the 2021 T20 World Cup final, one of Australia’s biggest T20 title innings.'],
    ['Test return impact', '2023', 'Comeback', 'Returned to Test prominence with aggressive middle-order runs during a major Australia cycle.'],
    ['All-round value', '2020s', 'Peak', 'His best seasons combine top-three batting power with useful seam overs when fit.'],
    ['LSG fit', '2026', 'Franchise', 'For LSG, Marsh offers a high-ceiling overseas all-rounder who can bat in the powerplay or middle overs.'],
  ],
  'Rohit Sharma': [
    ['Mumbai pathway', '1987', 'Origin', 'Rohit came through Mumbai cricket as a gifted timer before becoming one of India’s defining white-ball openers.'],
    ['India debut', '2007', 'Debut', 'Made his India debut in 2007 and was part of the first T20 World Cup-winning squad.'],
    ['Opening switch', '2013', 'Reinvention', 'Moving to opener changed his career, unlocking ODI double hundreds and long-innings dominance.'],
    ['ODI 264', '2014', 'Record', 'Scored 264 against Sri Lanka, the highest individual score in ODI history.'],
    ['MI captaincy dynasty', '2013-2020', 'Trophy', 'Led Mumbai Indians through a title dynasty, becoming one of the IPL’s most successful captains.'],
    ['India T20 WC captain', '2024', 'Trophy', 'Captained India to the 2024 T20 World Cup title, adding a global trophy to his leadership arc.'],
  ],
  'Suryakumar Yadav': [
    ['Mumbai domestic grind', '1990', 'Origin', 'Suryakumar built his career through Mumbai domestic cricket and years of IPL consistency before India selection.'],
    ['India debut', '2021', 'Debut', 'Made his India debut in 2021 and immediately brought 360-degree T20 strokeplay to the international stage.'],
    ['No. 1 T20I batter', '2022', 'Peak', 'Rose to the top of the T20I batting rankings through outrageous boundary options and consistency.'],
    ['T20I hundreds', '2022-2023', 'Milestone', 'Scored multiple T20I hundreds, turning innovation into repeatable output.'],
    ['2024 World Cup catch', '2024', 'Trophy', 'Was part of India’s 2024 T20 World Cup win, including the defining boundary catch in the final.'],
    ['MI fit', '2026', 'Franchise', 'For MI, he remains the middle-over tempo controller who can make conventional fields look obsolete.'],
  ],
  'Trent Boult': [
    ['New Zealand left-arm rise', '1989', 'Origin', 'Boult emerged as a left-arm swing bowler with one of the most threatening new-ball skill sets in world cricket.'],
    ['New Zealand debut', '2011', 'Debut', 'Made his New Zealand debut and became a long-term partner in their world-class pace attack.'],
    ['2015 World Cup final', '2015', 'Trophy run', 'Was central to New Zealand’s 2015 World Cup final campaign and led the tournament wicket charts jointly.'],
    ['2019 World Cup final', '2019', 'Final', 'Played another major role as New Zealand reached the 2019 World Cup final.'],
    ['IPL title with MI', '2020', 'Trophy', 'Was a key new-ball wicket-taker in Mumbai Indians’ 2020 IPL title season.'],
    ['MI fit', '2026', 'Franchise', 'For MI, Boult gives familiar left-arm powerplay threat and playoff-tested experience.'],
  ],
  'Quinton de Kock': [
    ['South African keeper-opener', '1992', 'Origin', 'De Kock came through South Africa as an attacking left-handed wicketkeeper-opener.'],
    ['South Africa debut', '2012', 'Debut', 'Made his international debut and quickly became an all-format top-order player.'],
    ['ODI hundred streaks', '2010s', 'Peak', 'Built a reputation for fast ODI hundreds and taking games away early.'],
    ['MI title years', '2019-2020', 'Trophy', 'Was part of Mumbai Indians’ dominant title years, giving them left-hand opening balance.'],
    ['World Cup 2023 runs', '2023', 'Milestone', 'Produced major ODI World Cup runs in 2023, reinforcing his big-tournament quality.'],
    ['MI fit', '2026', 'Franchise', 'For MI, de Kock offers a proven overseas keeper-opener route if the XI needs experience and left-hand tempo.'],
  ],
  'Shreyas Iyer': [
    ['Mumbai batting pathway', '1994', 'Origin', 'Iyer came through Mumbai cricket as an attacking top-order player strong against spin.'],
    ['India debut', '2017', 'Debut', 'Made his India debut in 2017 and grew into a middle-order option across formats.'],
    ['Delhi captaincy', '2018-2020', 'Leader', 'Led Delhi Capitals to a new competitive phase, including the 2020 IPL final.'],
    ['2023 World Cup runs', '2023', 'Peak', 'Scored major middle-order runs in India’s 2023 ODI World Cup campaign.'],
    ['KKR IPL title captain', '2024', 'Trophy', 'Captained KKR to the 2024 IPL title, making leadership a central part of his IPL identity.'],
    ['PBKS fit', '2026', 'Franchise', 'For Punjab, Iyer is captain, spin-hitter, middle-order organiser, and tactical anchor.'],
  ],
  'Arshdeep Singh': [
    ['Punjab left-arm rise', '1999', 'Origin', 'Arshdeep came through Punjab as a left-arm seamer with yorker control and death-overs temperament.'],
    ['India debut', '2022', 'Debut', 'Made his India T20I debut and quickly became trusted in high-pressure overs.'],
    ['Powerplay and death role', '2022-2024', 'Role', 'His value comes from being usable at both ends of a T20 innings.'],
    ['2024 T20 World Cup', '2024', 'Trophy', 'Was part of India’s 2024 T20 World Cup-winning attack and finished among the tournament’s leading wicket-takers.'],
    ['PBKS identity', '2020s', 'Franchise', 'Punjab retained him as a domestic pace cornerstone because left-arm death bowling is scarce.'],
    ['PBKS fit', '2026', 'Franchise', 'For Punjab, Arshdeep is the bowling leader who sets powerplay and death-over plans.'],
  ],
  'Yuzvendra Chahal': [
    ['Haryana leg-spin path', '1990', 'Origin', 'Chahal came through as a leg-spinner with chess-like planning and excellent white-ball deception.'],
    ['India debut', '2016', 'Debut', 'Made his India white-ball debut and became part of the Kuldeep-Chahal spin phase.'],
    ['T20I 6-for', '2017', 'Memory', 'Took 6 for 25 against England, one of India’s great T20I bowling performances.'],
    ['RCB wicket years', '2010s', 'Franchise', 'Became RCB’s key middle-over wicket-taker through years of high-risk home conditions.'],
    ['IPL Purple Cap', '2022', 'Award', 'Won the IPL Purple Cap with Rajasthan Royals, underlining his franchise wicket-taking durability.'],
    ['PBKS fit', '2026', 'Franchise', 'For Punjab, Chahal gives middle-over wicket threat and matchup control against right-hand-heavy lineups.'],
  ],
  'Ravindra Jadeja': [
    ['Saurashtra all-rounder', '1988', 'Origin', 'Jadeja came through Saurashtra as a left-arm spin all-rounder and elite fielder.'],
    ['India debut', '2009', 'Debut', 'Made his India debut in 2009 and gradually became a three-dimensional all-format cricketer.'],
    ['2013 Champions Trophy', '2013', 'Trophy', 'Was a major part of India’s 2013 Champions Trophy win, including tournament-leading bowling impact.'],
    ['Test all-round peak', '2010s-2020s', 'Peak', 'Became one of the world’s best Test all-rounders through control, batting growth, and fielding.'],
    ['CSK 2023 final finish', '2023', 'Trophy', 'Hit the title-winning boundary for CSK in the 2023 IPL final, a defining franchise moment.'],
    ['RR fit', '2026', 'Franchise', 'For Rajasthan, Jadeja adds senior all-round control, elite fielding, and title-winning experience.'],
  ],
  'Yashasvi Jaiswal': [
    ['Mumbai hardship path', '2001', 'Origin', 'Jaiswal’s story runs from difficult Mumbai beginnings to elite domestic and U19 run-making.'],
    ['U19 World Cup star', '2020', 'Breakthrough', 'Was Player of the Tournament at the 2020 U19 World Cup, making him an India future-batting marker.'],
    ['IPL breakout', '2023', 'Peak', 'Exploded for Rajasthan Royals in IPL 2023 with high-tempo opening and a record-fast fifty.'],
    ['India Test debut hundred', '2023', 'Debut', 'Made a Test hundred on India debut in the West Indies, immediately validating red-ball quality.'],
    ['England series double tons', '2024', 'Milestone', 'Produced huge Test runs against England, including double hundreds, showing elite long-format ceiling.'],
    ['RR fit', '2026', 'Franchise', 'For Rajasthan, Jaiswal is the franchise’s high-ceiling Indian opener and long-term batting face.'],
  ],
  'Heinrich Klaasen': [
    ['South African keeper path', '1991', 'Origin', 'Klaasen emerged as a wicketkeeper-batter with unusual power against spin.'],
    ['South Africa debut', '2018', 'Debut', 'Made his South Africa debut and quickly showed value as a middle-order disruptor.'],
    ['Spin-hitting reputation', '2020s', 'Skill', 'Built a global T20 reputation as one of the most destructive spin hitters in the world.'],
    ['IPL 2023 hundred', '2023', 'Memory', 'Scored a brilliant IPL hundred for SRH, proving his ability to dominate even in struggling team contexts.'],
    ['SRH power core', '2024', 'Peak', 'Was central to SRH’s ultra-aggressive batting identity alongside Head and Abhishek.'],
    ['SRH fit', '2026', 'Franchise', 'For SRH, Klaasen is the middle-order engine who punishes spin and protects momentum.'],
  ],
  'Ishan Kishan': [
    ['Jharkhand keeper-batter', '1998', 'Origin', 'Kishan came through Jharkhand as a left-handed wicketkeeper-batter with top-order power.'],
    ['U19 captaincy', '2016', 'Leader', 'Captained India at the 2016 U19 World Cup, marking him as an early leadership prospect.'],
    ['India debut', '2021', 'Debut', 'Made his India debut in 2021 and immediately brought attacking left-hand options to the top order.'],
    ['ODI double hundred', '2022', 'Milestone', 'Scored the fastest ODI double hundred, a career-defining statement of ceiling and tempo.'],
    ['MI years', '2018-2024', 'Franchise', 'Built IPL value through Mumbai Indians as a keeper-opener and middle-order option.'],
    ['SRH fit', '2026', 'Franchise', 'For SRH, Kishan adds left-hand aggression and keeping depth to an already explosive top order.'],
  ],
  'Sarfaraz Khan': [
    ['Mumbai run machine', '1997', 'Origin', 'Sarfaraz came through Mumbai cricket as a heavy-scoring middle-order batter after early age-group visibility.'],
    ['IPL teenage entry', '2015', 'Franchise', 'Entered the IPL as a teenager with RCB, showing improvisation and confidence before his first-class game fully matured.'],
    ['Ranji volume years', '2019-2023', 'Domestic peak', 'Built one of the strongest modern Ranji Trophy scoring records, repeatedly forcing India selection debate through huge first-class returns.'],
    ['India Test debut', '2024', 'Debut', 'Made his Test debut against England at Rajkot and scored twin fifties, proving he could handle the emotional weight of the long wait.'],
    ['Maiden Test hundred', '2024', 'Milestone', 'Converted his first Test hundred into 150 against New Zealand in Bengaluru, the specific international moment his timeline must carry.'],
    ['CSK fit', '2026', 'Franchise', 'For CSK, Sarfaraz is a spin-strong Indian batting option whose red-ball patience can be adapted into middle-over control.'],
  ],
  'Rajat Patidar': [
    ['Madhya Pradesh pathway', '1993', 'Origin', 'Patidar came through Madhya Pradesh cricket as a technically clean top-order batter with strong spin-hitting range.'],
    ['RCB playoff 112*', '2022', 'Iconic IPL', 'His unbeaten 112 in the IPL Eliminator against Lucknow became one of RCB’s great knockout innings.'],
    ['Madhya Pradesh Ranji title', '2022', 'Trophy', 'Was part of Madhya Pradesh’s Ranji Trophy title season, adding first-class credibility to the IPL breakout.'],
    ['India ODI debut', '2023', 'Debut', 'Made his India ODI debut against South Africa after sustained domestic and IPL performances.'],
    ['India Test debut', '2024', 'Test', 'Made his Test debut against England at Visakhapatnam, a late-bloomer reward after years of domestic work.'],
    ['RCB captain', '2026', 'Leader', 'For RCB, Patidar is captain and top-order stabilizer, carrying the post-title leadership story in a red-blue-gold environment.'],
  ],
  'Devdutt Padikkal': [
    ['Karnataka left-hander', '2000', 'Origin', 'Padikkal rose through Karnataka cricket as a tall left-handed opener with timing and off-side fluency.'],
    ['RCB breakout season', '2020', 'Breakthrough', 'Made an immediate IPL impression for RCB with top-order runs and composure in his first full season.'],
    ['IPL hundred', '2021', 'Milestone', 'Scored an unbeaten IPL hundred for RCB, proving his ability to turn starts into statement innings.'],
    ['India T20I debut', '2021', 'Debut', 'Made his India T20I debut in Sri Lanka as part of a young touring group.'],
    ['Test debut fifty', '2024', 'Test', 'Made his Test debut against England at Dharamsala and scored a half-century, a major red-ball checkpoint.'],
    ['RCB fit', '2026', 'Franchise', 'For RCB, Padikkal gives left-hand top-order depth and a familiar franchise connection.'],
  ],
  'Phil Salt': [
    ['Barbados and Sussex path', '1996', 'Origin', 'Salt’s cricket identity blends a Barbados childhood with English county development and fearless top-order hitting.'],
    ['England debut', '2021', 'Debut', 'Made his England debut as a white-ball opener/keeper option built for powerplay aggression.'],
    ['First England T20I hundred', '2023', 'Milestone', 'Hit his maiden T20I hundred against West Indies, becoming one of England’s rare T20I centurions.'],
    ['Back-to-back T20I tons', '2023', 'Record', 'Followed with another T20I hundred, becoming the first England men’s batter with two T20I centuries.'],
    ['KKR title impact', '2024', 'Trophy', 'Played a major powerplay role in KKR’s 2024 IPL title season before international duty interrupted the playoff stretch.'],
    ['RCB fit', '2026', 'Franchise', 'For RCB, Salt is a high-tempo keeper-opener who can make the first six overs feel like a chase-breaker.'],
  ],
  'Jitesh Sharma': [
    ['Vidarbha wicketkeeper', '1993', 'Origin', 'Jitesh came through Vidarbha as an attacking wicketkeeper-batter suited to finishing and pace hitting.'],
    ['Punjab Kings rise', '2022', 'IPL role', 'Made his IPL reputation with Punjab through fearless middle-order cameos and wicketkeeping flexibility.'],
    ['India T20I debut', '2023', 'Debut', 'Made his India T20I debut after the IPL showed he could attack from ball one.'],
    ['Finisher audition', '2023-2024', 'Role', 'His international chances centered on the specialist keeper-finisher role, a hard slot in India’s white-ball depth chart.'],
    ['RCB title squad', '2025', 'Trophy', 'Was part of RCB’s title-era squad structure, bringing lower-order acceleration and keeping depth.'],
    ['RCB fit', '2026', 'Franchise', 'For RCB, Jitesh is the domestic keeper-finisher who protects the XI if Salt is used differently.'],
  ],
  'Tim David': [
    ['Singapore to Australia route', '1996', 'Origin', 'David’s path is unusual: born in Singapore, internationally capped there, then moving into Australia’s T20 setup.'],
    ['Singapore T20I debut', '2019', 'Debut', 'Played T20Is for Singapore before his global franchise hitting made Australia selection possible.'],
    ['Mumbai Indians finisher', '2022', 'Franchise', 'Built IPL value as a death-overs hitter for Mumbai Indians, specializing in short high-impact innings.'],
    ['Australia debut', '2022', 'Australia', 'Made his Australia T20I debut as a late-overs power option.'],
    ['Global finisher role', '2020s', 'Peak', 'His best seasons are measured less by aggregates than by strike-rate, six-hitting, and final-four-over threat.'],
    ['RCB fit', '2026', 'Franchise', 'For RCB, David is the designated late-innings accelerator who can turn 18 balls into match separation.'],
  ],
  'Romario Shepherd': [
    ['Guyana all-rounder', '1994', 'Origin', 'Shepherd came through Guyana as a seam-bowling all-rounder with lower-order hitting power.'],
    ['West Indies debut', '2019', 'Debut', 'Made his West Indies debut and moved into the T20 all-rounder pool.'],
    ['Death hitting profile', '2020s', 'Skill', 'His T20 value comes from heavy hitting at the back end and useful seam overs.'],
    ['IPL impact cameos', '2020s', 'Franchise', 'In IPL roles, he is selected for condensed impact rather than long spells or long innings.'],
    ['West Indies T20 depth', '2020s', 'International', 'His international role sits in the Caribbean power-all-rounder tradition.'],
    ['RCB fit', '2026', 'Franchise', 'For RCB, Shepherd gives overseas finishing cover and seam balance if matchups demand power.'],
  ],
  'Jacob Bethell': [
    ['Barbados-born England pathway', '2003', 'Origin', 'Bethell moved through England’s age-group system as a left-handed batter and left-arm spin all-rounder.'],
    ['U19 World Cup visibility', '2022', 'Breakthrough', 'England’s U19 World Cup run made him visible as a high-upside modern all-rounder.'],
    ['England debut', '2024', 'Debut', 'Made his England international debut in 2024, moving from prospect to senior white-ball option.'],
    ['Test opportunity', '2024', 'Red ball', 'Earned England Test exposure during a rapid rise, showing how highly the setup rated his ceiling.'],
    ['Skill package', '2020s', 'Role', 'His value comes from left-hand batting, spin cover, fielding, and age-profile upside.'],
    ['RCB fit', '2026', 'Franchise', 'For RCB, Bethell is the developmental overseas all-rounder with room to become more than a matchup pick.'],
  ],
  'Krunal Pandya': [
    ['Baroda all-rounder', '1991', 'Origin', 'Krunal came through Baroda as a left-arm spin all-rounder with a direct, combative batting style.'],
    ['Mumbai Indians title years', '2016-2020', 'Trophy', 'Became part of Mumbai Indians’ title machine, offering spin, fielding, and lower-order left-hand hitting.'],
    ['India T20I debut', '2018', 'Debut', 'Made his India T20I debut as a spin-bowling all-rounder.'],
    ['Fast ODI debut fifty', '2021', 'Milestone', 'Scored a rapid fifty on ODI debut against England, an emotional innings after family loss.'],
    ['IPL leadership and utility', '2020s', 'Role', 'His best seasons are built on utility: two-phase spin, matchup batting, and senior game sense.'],
    ['RCB fit', '2026', 'Franchise', 'For RCB, Krunal gives domestic all-round balance and a left-arm spin option in pressure phases.'],
  ],
  'Bhuvneshwar Kumar': [
    ['Meerut swing bowler', '1990', 'Origin', 'Bhuvneshwar came through Uttar Pradesh as a swing bowler with unusually refined new-ball control.'],
    ['India debut swing spell', '2012', 'Debut', 'Made his India debut with immediate swing impact, including early wickets against Pakistan.'],
    ['Champions Trophy winner', '2013', 'Trophy', 'Was part of India’s 2013 Champions Trophy-winning squad.'],
    ['IPL Purple Caps', '2016-2017', 'Peak', 'Won back-to-back IPL Purple Caps for Sunrisers Hyderabad, a rare bowling consistency achievement.'],
    ['SRH title season', '2016', 'Trophy', 'Led the wickets column in SRH’s 2016 IPL title run, connecting individual peak to team silverware.'],
    ['RCB fit', '2026', 'Franchise', 'For RCB, Bhuvneshwar brings powerplay swing, death-over experience, and calm senior bowling intelligence.'],
  ],
  'Josh Hazlewood': [
    ['New South Wales metronome', '1991', 'Origin', 'Hazlewood developed as a tall, accurate Australian fast bowler with relentless hard lengths.'],
    ['Australia debut', '2010', 'Debut', 'Made his Australia debut as a teenager and grew into a three-format pace option.'],
    ['2015 World Cup winner', '2015', 'Trophy', 'Was part of Australia’s 2015 ODI World Cup-winning squad.'],
    ['Test attack pillar', '2010s-2020s', 'Peak', 'Became one of Australia’s Test attack pillars through accuracy, bounce, and seam movement.'],
    ['2021 T20 World Cup', '2021', 'Trophy', 'Played a key role as Australia won the 2021 T20 World Cup.'],
    ['RCB fit', '2026', 'Franchise', 'For RCB, Hazlewood is the overseas control quick who can bowl powerplay pressure without losing shape.'],
  ],
  'Harshal Patel': [
    ['Haryana seam all-rounder', '1990', 'Origin', 'Harshal built his profile through domestic cricket as a clever medium-fast bowler and lower-order hitter.'],
    ['IPL Purple Cap record', '2021', 'Peak', 'Won the IPL Purple Cap with 32 wickets for RCB, tying the then record for most wickets in an IPL season.'],
    ['India T20I debut', '2021', 'Debut', 'Made his India T20I debut after the slower-ball and death-over craft translated into elite IPL output.'],
    ['Death-over specialist', '2020s', 'Role', 'His value sits in pace-off control, cutters, and tactical deception when batters are forced to attack.'],
    ['SRH squad utility', '2026', 'Franchise', 'For SRH, Harshal is an Indian death-over option who can change pace on batting-friendly surfaces.'],
  ],
  'Abhishek Sharma': [
    ['Punjab left-hand all-rounder', '2000', 'Origin', 'Abhishek came through Punjab and India U19 as a left-handed batter with useful left-arm spin.'],
    ['U19 World Cup winner', '2018', 'Trophy', 'Was part of India’s 2018 U19 World Cup-winning squad, connecting him to a strong generation.'],
    ['SRH powerplay breakout', '2024', 'Peak', 'His 2024 IPL season transformed his profile through fearless powerplay hitting alongside Travis Head.'],
    ['India T20I debut', '2024', 'Debut', 'Made his India T20I debut after the IPL breakout demanded national attention.'],
    ['First T20I hundred', '2024', 'Milestone', 'Scored an early T20I hundred, proving the powerplay style could transfer to international cricket.'],
    ['SRH fit', '2026', 'Franchise', 'For SRH, Abhishek is the Indian half of their left-handed powerplay assault and a sixth-bowling option.'],
  ],
  'Nitish Kumar Reddy': [
    ['Andhra seam all-rounder', '2003', 'Origin', 'Nitish came through Andhra cricket as a seam-bowling all-rounder with middle-order batting confidence.'],
    ['SRH emergence', '2024', 'Breakthrough', 'The 2024 IPL season brought him into national focus through batting maturity and useful seam overs.'],
    ['India debut', '2024', 'Debut', 'Made his India debut after the IPL proved he could handle pressure and role flexibility.'],
    ['Test hundred in Australia', '2024', 'Milestone', 'Scored a maiden Test hundred in Australia, a major all-rounder credibility marker early in his career.'],
    ['All-rounder ceiling', '2020s', 'Peak', 'His best seasons will be judged by whether batting progress and bowling volume rise together.'],
    ['SRH fit', '2026', 'Franchise', 'For SRH, Nitish gives domestic all-round balance without using an overseas slot.'],
  ],
  'Kamindu Mendis': [
    ['Ambidextrous Sri Lankan talent', '1998', 'Origin', 'Kamindu came through Sri Lanka as a rare ambidextrous spinner and left-handed batter.'],
    ['Sri Lanka debut', '2018', 'Debut', 'Made his Sri Lanka debut with curiosity around his two-arm spin and all-round profile.'],
    ['Test batting rise', '2024', 'Peak', 'His 2024 Test run made him more than a novelty, establishing him as a serious international batter.'],
    ['Fast Test hundreds marker', '2024', 'Milestone', 'Reached early Test hundreds at unusual speed, turning his red-ball output into a global storyline.'],
    ['All-round option', '2020s', 'Role', 'His value is multi-layered: batting depth, spin variation, fielding, and matchup surprise.'],
    ['SRH fit', '2026', 'Franchise', 'For SRH, Kamindu is a tactical overseas all-rounder who can stretch team combinations.'],
  ],
  'Liam Livingstone': [
    ['Lancashire power hitter', '1993', 'Origin', 'Livingstone emerged from Lancashire as a high-ceiling hitter with both off-spin and leg-spin options.'],
    ['England debut', '2017', 'Debut', 'Made his England debut as a white-ball power option.'],
    ['England T20I hundred', '2021', 'Milestone', 'Scored a 42-ball T20I hundred against Pakistan, one of England’s great power-hitting displays.'],
    ['T20 World Cup winner', '2022', 'Trophy', 'Was part of England’s 2022 T20 World Cup-winning squad.'],
    ['Global franchise profile', '2020s', 'Peak', 'His best seasons are built on six-hitting, spin flexibility, and the threat of sudden acceleration.'],
    ['SRH fit', '2026', 'Franchise', 'For SRH, Livingstone adds a middle-order power layer to an already aggressive batting identity.'],
  ],
  'Gerald Coetzee': [
    ['Free State fast bowler', '2000', 'Origin', 'Coetzee came through South African cricket as a hostile fast bowler with short-ball energy and lower-order hitting.'],
    ['South Africa debut', '2023', 'Debut', 'Made his South Africa debut and quickly moved into their World Cup plans.'],
    ['2023 World Cup wickets', '2023', 'Breakthrough', 'Produced a strong 2023 ODI World Cup, becoming South Africa’s leading wicket-taker in the tournament.'],
    ['IPL pace value', '2024', 'Franchise', 'Entered IPL cricket as an overseas pace option with aggression and impact-ball potential.'],
    ['Bowling identity', '2020s', 'Role', 'His value is hostility: hard lengths, bouncers, and wicket-taking energy rather than containment alone.'],
    ['SRH fit', '2026', 'Franchise', 'For SRH, Coetzee gives pace depth behind Cummins and a different type of middle-over threat.'],
  ],
  'Rinku Singh': [
    ['Aligarh to domestic cricket', '1997', 'Origin', 'Rinku’s story came through Uttar Pradesh cricket and years of squad grinding before national recognition.'],
    ['KKR five sixes', '2023', 'Iconic IPL', 'Hit five consecutive sixes off Yash Dayal to win a match for KKR, instantly becoming an IPL folklore figure.'],
    ['India T20I debut', '2023', 'Debut', 'Made his India T20I debut after the finishing role became impossible to ignore.'],
    ['Finisher consistency', '2023-2024', 'Peak', 'His India role grew because he was not only explosive; he was repeatably calm in late chases.'],
    ['T20 World Cup squad', '2024', 'India', 'Remained in India’s T20 World Cup conversation as one of the clearest specialist finishers.'],
    ['KKR fit', '2026', 'Franchise', 'For KKR, Rinku is emotional core and left-handed finishing insurance.'],
  ],
  'Rovman Powell': [
    ['Jamaica power path', '1993', 'Origin', 'Powell came through Jamaican cricket as a powerful middle-order hitter and athletic fielder.'],
    ['West Indies debut', '2016', 'Debut', 'Made his West Indies debut and became part of their modern T20 power pool.'],
    ['ODI hundred', '2018', 'Milestone', 'Scored an ODI hundred for West Indies, showing he was not only a cameo hitter.'],
    ['West Indies T20I captain', '2020s', 'Leader', 'Captained West Indies in T20Is, adding leadership responsibility to the power-hitting role.'],
    ['Franchise finishing value', '2020s', 'Peak', 'His best seasons are built around matchup hitting, late-over sixes, and pressure catching.'],
    ['KKR fit', '2026', 'Franchise', 'For KKR, Powell is overseas middle-order power and leadership cover.'],
  ],
  'Finn Allen': [
    ['New Zealand attacking opener', '1999', 'Origin', 'Allen emerged as a fearless New Zealand top-order batter with immediate boundary intent.'],
    ['New Zealand debut', '2021', 'Debut', 'Made his New Zealand debut as a T20 opener designed to maximize the powerplay.'],
    ['T20I hundred', '2022', 'Milestone', 'Scored a T20I hundred against Scotland, proving his international ceiling.'],
    ['137 vs Pakistan', '2024', 'Record', 'Made 137 against Pakistan in a T20I, one of New Zealand’s biggest short-format innings.'],
    ['Powerplay specialist', '2020s', 'Role', 'His role is clear: accept risk early and force fielding sides out of their default plan.'],
    ['KKR fit', '2026', 'Franchise', 'For KKR, Allen is an overseas opening option if they want maximum first-six-over aggression.'],
  ],
  'Tim Seifert': [
    ['New Zealand keeper hitter', '1994', 'Origin', 'Seifert came through Northern Districts as a wicketkeeper-batter with fast hands and top-order T20 range.'],
    ['New Zealand debut', '2018', 'Debut', 'Made his New Zealand debut as part of their white-ball keeping depth.'],
    ['T20I 84 vs India', '2019', 'Memory', 'Made 84 against India in Wellington, one of the innings that defined his early international reputation.'],
    ['Global league value', '2020s', 'Franchise', 'Moved through T20 leagues as a flexible keeper-opener or middle-order option.'],
    ['Role clarity', '2020s', 'Skill', 'His best usage comes when he is asked to attack pace early rather than rebuild conservatively.'],
    ['KKR fit', '2026', 'Franchise', 'For KKR, Seifert gives overseas wicketkeeping depth and tempo insurance.'],
  ],
  'Varun Chakaravarthy': [
    ['Tamil Nadu mystery spinner', '1991', 'Origin', 'Varun’s path was unconventional, moving from architecture and tennis-ball cricket into professional mystery spin.'],
    ['KKR breakout', '2020', 'Breakthrough', 'Became a central KKR bowler through variations, defensive control, and middle-over wickets.'],
    ['India debut', '2021', 'Debut', 'Made his India T20I debut and was picked for the 2021 T20 World Cup squad.'],
    ['KKR title season', '2024', 'Trophy', 'Played a major role in KKR’s 2024 IPL title run with middle-over control and wicket pressure.'],
    ['India return', '2020s', 'Comeback', 'Kept himself in India T20 conversations through sustained IPL output.'],
    ['KKR fit', '2026', 'Franchise', 'For KKR, Varun remains a tactical spin pillar alongside Narine.'],
  ],
  'Umran Malik': [
    ['Jammu pace story', '1999', 'Origin', 'Umran emerged from Jammu and Kashmir cricket as one of India’s fastest raw pace prospects.'],
    ['SRH speed breakout', '2021-2022', 'Breakthrough', 'His IPL speed for SRH made him a national talking point and earned fast-track attention.'],
    ['India debut', '2022', 'Debut', 'Made his India debut after IPL spells regularly crossed high pace thresholds.'],
    ['Fast-bowling ceiling', '2020s', 'Skill', 'His value is not subtle: high pace, hard lengths, and the possibility of wickets through speed.'],
    ['Development challenge', '2020s', 'Growth', 'The career question is control: turning raw pace into repeatable pressure under T20 fields.'],
    ['KKR fit', '2026', 'Franchise', 'For KKR, Umran is a high-ceiling pace option who changes the energy of an innings.'],
  ],
  'Navdeep Saini': [
    ['Haryana to Delhi pace path', '1992', 'Origin', 'Saini rose from Haryana roots into Delhi cricket as a skiddy fast bowler with pace.'],
    ['India debut', '2019', 'Debut', 'Made his India T20I debut and immediately showed wicket-taking pace.'],
    ['ODI and Test exposure', '2019-2021', 'India', 'Played across formats for India, including Test cricket in Australia.'],
    ['Gabba series squad', '2021', 'Memory', 'Was part of India’s injury-hit Australia tour, a series remembered for depth and resilience.'],
    ['Pace depth role', '2020s', 'Role', 'His value is as a domestic quick with international experience and short-burst pace.'],
    ['KKR fit', '2026', 'Franchise', 'For KKR, Saini gives Indian pace depth behind the primary overseas strike options.'],
  ],
  'Washington Sundar': [
    ['Tamil Nadu spin all-rounder', '1999', 'Origin', 'Washington came through Tamil Nadu cricket as a disciplined off-spinner with top-order batting ability.'],
    ['India T20I debut', '2017', 'Debut', 'Made his India T20I debut as a teenager, valued for powerplay off-spin.'],
    ['Nidahas Trophy role', '2018', 'Breakthrough', 'Played a major role in India’s Nidahas Trophy win through control and composure.'],
    ['Gabba 62 and wickets', '2021', 'Iconic Test', 'Made a crucial 62 and took wickets on Test debut at the Gabba, one of India’s great depth stories.'],
    ['All-format utility', '2020s', 'Role', 'His best seasons combine off-spin economy, batting depth, and matchup flexibility.'],
    ['GT fit', '2026', 'Franchise', 'For Gujarat, Washington gives domestic all-round balance and powerplay spin options.'],
  ],
  'Mohammad Siraj': [
    ['Hyderabad pace rise', '1994', 'Origin', 'Siraj came through Hyderabad cricket as a relentless fast bowler with seam movement and emotional intensity.'],
    ['India T20I debut', '2017', 'Debut', 'Made his India debut in T20Is before growing into a Test and ODI strike bowler.'],
    ['Australia Test breakthrough', '2020-2021', 'Breakthrough', 'Led India’s attack at the Gabba in only his third Test, taking a five-wicket haul.'],
    ['Asia Cup final 6-for', '2023', 'Iconic spell', 'Took 6 for 21 against Sri Lanka in the Asia Cup final, one of India’s great ODI new-ball spells.'],
    ['World Cup attack', '2023', 'Peak', 'Was part of India’s dominant 2023 ODI World Cup pace unit.'],
    ['GT fit', '2026', 'Franchise', 'For Gujarat, Siraj is the Indian new-ball spearhead with wicket-taking volatility.'],
  ],
  'Kuldeep Yadav': [
    ['Kanpur wrist-spinner', '1994', 'Origin', 'Kuldeep came through as a rare Indian left-arm wrist-spinner with drift, dip, and wicket-taking ambition.'],
    ['India Test debut', '2017', 'Debut', 'Made his Test debut against Australia at Dharamsala and immediately gave India a different spin profile.'],
    ['ODI hat-tricks', '2017-2019', 'Milestone', 'Took multiple ODI hat-tricks, showing his ability to change games in clusters.'],
    ['White-ball revival', '2022-2024', 'Comeback', 'Rebuilt his action and confidence to become central again in India’s white-ball plans.'],
    ['2024 T20 World Cup', '2024', 'Trophy', 'Was part of India’s 2024 T20 World Cup-winning squad, used as an attacking middle-over wrist-spinner.'],
    ['DC fit', '2026', 'Franchise', 'For Delhi, Kuldeep is the middle-over wicket engine who forces batters to take risks.'],
  ],
  'Mukesh Kumar': [
    ['Bengal seam grind', '1993', 'Origin', 'Mukesh came through Bengal cricket through long domestic spells and red-ball consistency.'],
    ['India Test debut', '2023', 'Debut', 'Made his India Test debut in the West Indies, a late-earned reward for domestic seam work.'],
    ['All-format India exposure', '2023', 'India', 'Played across formats for India, moving from red-ball control into white-ball roles.'],
    ['Death-over audition', '2020s', 'Role', 'His T20 value comes from yorkers, cutters, and calm execution at the end.'],
    ['DC seasons', '2020s', 'Franchise', 'Delhi used him as an Indian pace option capable of both new-ball and death-over work.'],
    ['DC fit', '2026', 'Franchise', 'For Delhi, Mukesh is domestic seam reliability in a squad with overseas strike options.'],
  ],
  'T. Natarajan': [
    ['Tamil Nadu yorker path', '1991', 'Origin', 'Natarajan rose from Tamil Nadu cricket with a signature yorker and a powerful underdog story.'],
    ['SRH death bowling', '2020', 'Breakthrough', 'His IPL 2020 death bowling made him a national story and earned India selection.'],
    ['India debut tour', '2020-2021', 'Debut', 'Made his India debut across formats on the Australia tour, a rare rapid multi-format entry.'],
    ['Gabba Test', '2021', 'Memory', 'Played the Gabba Test in India’s famous series win, adding red-ball weight to a white-ball specialist image.'],
    ['Yorker specialist', '2020s', 'Role', 'His best seasons are defined by death-over trust and left-arm angle.'],
    ['DC fit', '2026', 'Franchise', 'For Delhi, Natarajan gives Indian left-arm death bowling, one of the scarcest T20 roles.'],
  ],
  'Karun Nair': [
    ['Karnataka run-maker', '1991', 'Origin', 'Karun came through Karnataka cricket as a technically organised top-order batter in a strong domestic system.'],
    ['India Test debut', '2016', 'Debut', 'Made his India Test debut in 2016 after domestic volume and IPL exposure made him a middle-order option.'],
    ['Chennai triple hundred', '2016', 'Milestone', 'Scored 303 not out against England in Chennai, becoming only the second Indian after Virender Sehwag to make a Test triple century.'],
    ['Domestic persistence', '2017-2024', 'Resilience', 'After falling out of the India side, his career became a persistence story through Ranji, county, and franchise opportunities.'],
    ['IPL veteran lane', '2020s', 'Franchise', 'His IPL value is experience: an Indian batter who has opened, anchored, and handled spin-heavy middle overs.'],
    ['DC fit', '2026', 'Franchise', 'For Delhi, Karun is a depth batter whose triple-hundred ceiling still gives his profile historical weight.'],
  ],
  'Prithvi Shaw': [
    ['Mumbai prodigy', '1999', 'Origin', 'Shaw came through Mumbai cricket as an attacking opener with school-record fame and elite age-group scoring.'],
    ['U19 World Cup captain', '2018', 'Trophy', 'Captained India to the 2018 U19 World Cup title, the same tournament that pushed Gill into the national future frame.'],
    ['Test debut hundred', '2018', 'Debut', 'Made a century on Test debut against West Indies, immediately showing his international ceiling.'],
    ['Delhi IPL peak', '2021', 'Peak', 'His strongest IPL windows came when Delhi used him as a pure powerplay tempo-setter.'],
    ['Comeback stakes', '2020s', 'Resilience', 'His later career has been about fitness, consistency, and rebuilding trust around a very high batting ceiling.'],
    ['DC fit', '2026', 'Franchise', 'For Delhi, Shaw is a volatility-and-upside opener: if rhythm returns, the first six overs change fast.'],
  ],
  'Nitish Rana': [
    ['Delhi left-hander', '1993', 'Origin', 'Rana came through Delhi cricket as a left-handed batter who could also offer part-time off-spin.'],
    ['Mumbai and KKR rise', '2016-2018', 'Franchise', 'Built his IPL reputation through Mumbai Indians and then KKR as a spin-hitting top/middle-order option.'],
    ['India debut', '2021', 'Debut', 'Made his India debut on the Sri Lanka tour, earning international recognition after IPL consistency.'],
    ['KKR captaincy phase', '2023', 'Leader', 'Captained KKR in 2023, adding leadership to a profile previously defined by batting tempo.'],
    ['Spin-hitting value', '2020s', 'Skill', 'His best seasons are when he controls matchups against spin and stabilizes innings without losing tempo.'],
    ['DC fit', '2026', 'Franchise', 'For Delhi, Rana gives Indian left-hand batting depth and a senior IPL voice.'],
  ],
  'Sai Sudharsan': [
    ['Tamil Nadu top-order rise', '2001', 'Origin', 'Sai Sudharsan came through Tamil Nadu cricket as a left-handed top-order batter with calm tempo and strong domestic returns.'],
    ['GT final 96', '2023', 'Breakthrough', 'Made 96 in the 2023 IPL final for Gujarat Titans, an innings that announced his big-stage temperament.'],
    ['India ODI debut', '2023', 'Debut', 'Made his India ODI debut against South Africa and started with composed top-order runs.'],
    ['IPL 2024 volume', '2024', 'Peak', 'Kept building as Gujarat’s Indian batting pillar, combining anchor qualities with boundary access.'],
    ['County and red-ball growth', '2020s', 'Development', 'His career arc includes red-ball and county exposure, pointing toward more than a T20-only profile.'],
    ['GT fit', '2026', 'Franchise', 'For Gujarat, Sai is the left-handed batting stabilizer around whom innings can be structured.'],
  ],
  'Aiden Markram': [
    ['South Africa U19 captain', '1994', 'Origin', 'Markram came through as captain of South Africa’s 2014 U19 World Cup-winning side.'],
    ['Test debut and hundreds', '2017', 'Debut', 'Made his Test debut and quickly scored early hundreds, suggesting a long-term top-order future.'],
    ['SA20 title captain', '2023', 'Trophy', 'Captained Sunrisers Eastern Cape to the inaugural SA20 title, strengthening his franchise leadership profile.'],
    ['SRH captaincy phase', '2023', 'Leader', 'Captained SRH in the IPL, connecting his South African leadership success to the Hyderabad setup.'],
    ['Spin and batting balance', '2020s', 'Role', 'His T20 value comes from top-order batting, off-spin matchups, and leadership calm.'],
    ['LSG fit', '2026', 'Franchise', 'For LSG, Markram gives overseas batting control and a secondary leadership voice around Pant.'],
  ],
  'Matthew Breetzke': [
    ['Eastern Cape pathway', '1998', 'Origin', 'Breetzke came through South African cricket as a top-order wicketkeeper-batter with strong domestic white-ball returns.'],
    ['South Africa T20I debut', '2023', 'Debut', 'Made his South Africa T20I debut as part of their next wave of batting options.'],
    ['ODI debut 150', '2025', 'Milestone', 'Scored 150 on ODI debut, a record-setting innings that immediately gave his international profile substance.'],
    ['SA20 visibility', '2020s', 'Franchise', 'Built franchise credibility through SA20 and domestic performances before wider league demand grew.'],
    ['Top-order role', '2020s', 'Skill', 'His value is top-order batting with keeping flexibility and a willingness to play tempo cricket.'],
    ['LSG fit', '2026', 'Franchise', 'For LSG, Breetzke is overseas batting depth behind a stacked keeper-batter group.'],
  ],
  'Avesh Khan': [
    ['Madhya Pradesh pace path', '1996', 'Origin', 'Avesh came through Madhya Pradesh and India U19 as a hit-the-deck fast bowler.'],
    ['Delhi Capitals breakout', '2021', 'Peak', 'His 2021 IPL season with Delhi made him one of the tournament’s leading Indian wicket-takers.'],
    ['India T20I debut', '2022', 'Debut', 'Made his India T20I debut after IPL output created a clear fast-bowling case.'],
    ['Death and hard-length role', '2020s', 'Role', 'His strongest T20 spells use hard lengths, pace, and defensive fields to force miscues.'],
    ['India squad depth', '2020s', 'India', 'Remained in India white-ball squad conversations as a pace-depth option.'],
    ['LSG fit', '2026', 'Franchise', 'For LSG, Avesh is a domestic fast bowler who can take high-pressure overs without using an overseas slot.'],
  ],
  'Anrich Nortje': [
    ['South African pace rise', '1993', 'Origin', 'Nortje emerged as one of South Africa’s fastest bowlers, built around speed and hard lengths.'],
    ['South Africa debut', '2019', 'Debut', 'Made his South Africa debut and quickly entered their World Cup and Test pace plans.'],
    ['Delhi Capitals pace peak', '2020', 'IPL peak', 'His 2020 IPL season with Delhi, alongside Rabada, made him one of the fastest and most feared quicks in the league.'],
    ['Fastest-ball reputation', '2020s', 'Skill', 'His identity is speed: pushing batters back and changing scoring options through pace alone.'],
    ['Injury interruptions', '2020s', 'Resilience', 'Injuries have shaped his availability, but when fit he changes the physical tone of an attack.'],
    ['LSG fit', '2026', 'Franchise', 'For LSG, Nortje is the overseas pace enforcer who gives Pant a pure speed option.'],
  ],
  'Mohammed Shami': [
    ['Bengal seam path', '1990', 'Origin', 'Shami rose through Bengal cricket as a seam bowler with one of the cleanest wrist positions in world cricket.'],
    ['India debut', '2013', 'Debut', 'Made his India debut and quickly became a wicket-taking new-ball and reverse-swing option.'],
    ['World Cup hat-trick', '2019', 'Memory', 'Took a World Cup hat-trick against Afghanistan, reinforcing his tournament wicket threat.'],
    ['IPL Purple Cap', '2023', 'Award', 'Won the IPL Purple Cap for Gujarat Titans with new-ball wickets and relentless seam control.'],
    ['2023 World Cup wickets', '2023', 'Peak', 'Was the leading wicket-taker at the 2023 ODI World Cup, including devastating knockout spells.'],
    ['LSG fit', '2026', 'Franchise', 'For LSG, Shami gives senior Indian pace leadership and proven tournament strike value.'],
  ],
  'Marcus Stoinis': [
    ['Western Australia all-rounder', '1989', 'Origin', 'Stoinis developed as a powerful Australian batting all-rounder with seam-bowling utility.'],
    ['Australia debut', '2015', 'Debut', 'Made his Australia debut and became a flexible white-ball squad option.'],
    ['ODI 146* vs NZ', '2017', 'Memory', 'Scored 146 not out against New Zealand while almost pulling off a solo chase, the innings that defined his ceiling.'],
    ['T20 World Cup winner', '2021', 'Trophy', 'Was part of Australia’s 2021 T20 World Cup-winning squad.'],
    ['LSG power role', '2020s', 'Franchise', 'Became a core LSG overseas all-rounder through middle-order hitting and matchup overs.'],
    ['PBKS fit', '2026', 'Franchise', 'For Punjab, Stoinis brings senior overseas power and a seam option in one slot.'],
  ],
  'Marco Jansen': [
    ['Potchefstroom left-armer', '2000', 'Origin', 'Jansen came through South Africa as a very tall left-arm fast-bowling all-rounder.'],
    ['South Africa Test debut', '2021', 'Debut', 'Made his Test debut against India and immediately looked dangerous with bounce and angle.'],
    ['Lower-order batting growth', '2020s', 'Development', 'His batting improved enough to make him a genuine all-round option rather than a tailender.'],
    ['World Cup role', '2023', 'International', 'Was part of South Africa’s 2023 World Cup campaign as a new-ball and lower-order contributor.'],
    ['IPL value', '2020s', 'Franchise', 'His value is rare: left-arm pace, height, powerplay wickets, and batting depth.'],
    ['PBKS fit', '2026', 'Franchise', 'For Punjab, Jansen gives balance and a point-of-difference angle in the pace group.'],
  ],
  'Azmatullah Omarzai': [
    ['Afghanistan all-rounder', '2000', 'Origin', 'Omarzai came through Afghanistan cricket as a seam-bowling all-rounder with top/middle-order batting growth.'],
    ['Afghanistan debut', '2021', 'Debut', 'Made his Afghanistan debut and quickly became part of their all-rounder core.'],
    ['2023 World Cup impact', '2023', 'Breakthrough', 'Produced important all-round moments in Afghanistan’s strong 2023 ODI World Cup campaign.'],
    ['ICC recognition', '2024', 'Peak', 'His all-round output earned global recognition as one of Afghanistan’s key modern players.'],
    ['Franchise value', '2020s', 'Role', 'His value is balance: seam overs, batting flexibility, and big-match temperament.'],
    ['PBKS fit', '2026', 'Franchise', 'For Punjab, Omarzai is an overseas all-rounder who can lengthen both batting and bowling.'],
  ],
  'Lockie Ferguson': [
    ['Auckland express pace', '1991', 'Origin', 'Ferguson emerged from New Zealand cricket as an express quick with a heavy short ball.'],
    ['New Zealand debut', '2016', 'Debut', 'Made his New Zealand debut and moved quickly into white-ball strike plans.'],
    ['2019 World Cup final run', '2019', 'Trophy run', 'Was one of New Zealand’s leading wicket-takers during their 2019 World Cup final campaign.'],
    ['IPL pace weapon', '2020s', 'Franchise', 'Built IPL value through short bursts of speed and middle-over wicket threat.'],
    ['T20 World Cup spell', '2024', 'Milestone', 'Produced a rare four-maiden T20I spell at the 2024 T20 World Cup, a statistical outlier for pace control.'],
    ['PBKS fit', '2026', 'Franchise', 'For Punjab, Ferguson gives an overseas pace shock option when surfaces reward speed.'],
  ],
  'Dhruv Jurel': [
    ['Uttar Pradesh keeper path', '2001', 'Origin', 'Jurel came through Uttar Pradesh and India U19 cricket as a composed wicketkeeper-batter.'],
    ['Rajasthan Royals rise', '2023', 'Franchise', 'Earned IPL attention with calm lower-order finishing for Rajasthan Royals.'],
    ['India Test debut', '2024', 'Debut', 'Made his India Test debut against England during a series that introduced several new Indian players.'],
    ['Ranchi 90', '2024', 'Memory', 'His 90 at Ranchi against England was a pressure innings that turned him from prospect into serious Test option.'],
    ['Keeper-batter value', '2020s', 'Role', 'His value is composure: keeping skill, lower-order batting, and calm under scoreboard pressure.'],
    ['RR fit', '2026', 'Franchise', 'For Rajasthan, Jurel is domestic keeper-batter depth with genuine India-level credibility.'],
  ],
  'Shimron Hetmyer': [
    ['Guyana left-hander', '1996', 'Origin', 'Hetmyer came through West Indies cricket as a bold left-handed batter with elite shot power.'],
    ['U19 World Cup captain', '2016', 'Trophy', 'Captained West Indies to the 2016 U19 World Cup title, a major early leadership achievement.'],
    ['West Indies debut', '2017', 'Debut', 'Made his West Indies debut and became a high-upside middle-order option.'],
    ['ODI hundreds', '2010s', 'Milestone', 'Scored multiple ODI hundreds, showing he had more than cameo power.'],
    ['RR finisher role', '2020s', 'Franchise', 'For Rajasthan, he became a left-handed finisher trusted to attack spin and pace late.'],
    ['RR fit', '2026', 'Franchise', 'Hetmyer remains RR’s overseas finishing force and matchup disruptor.'],
  ],
  'Dasun Shanaka': [
    ['Sri Lankan all-rounder', '1991', 'Origin', 'Shanaka came through Sri Lankan cricket as a seam-bowling all-rounder and lower-order power hitter.'],
    ['Sri Lanka debut', '2015', 'Debut', 'Made his Sri Lanka debut and moved through the white-ball all-rounder pathway.'],
    ['Sri Lanka captaincy', '2020s', 'Leader', 'Captained Sri Lanka through a rebuilding phase, becoming a central dressing-room figure.'],
    ['Asia Cup winner', '2022', 'Trophy', 'Led Sri Lanka to the 2022 Asia Cup title, one of the country’s major modern white-ball achievements.'],
    ['Finishing value', '2020s', 'Role', 'His best innings are late-order momentum swings rather than long accumulation.'],
    ['RR fit', '2026', 'Franchise', 'For Rajasthan, Shanaka offers overseas leadership, finishing, and seam-bowling cover.'],
  ],
  'Jofra Archer': [
    ['Barbados to England pace path', '1995', 'Origin', 'Archer’s route took him from Barbados to Sussex and then England, bringing extreme pace and rare composure.'],
    ['England debut', '2019', 'Debut', 'Made his England debut in 2019 and was fast-tracked into their World Cup plans.'],
    ['2019 World Cup Super Over', '2019', 'Trophy', 'Bowled the Super Over as England won the 2019 ODI World Cup, a defining pressure moment.'],
    ['Ashes arrival', '2019', 'Test', 'Made an immediate Ashes impact with pace and hostility, including the spell to Steve Smith at Lord’s.'],
    ['Injury fight', '2020s', 'Resilience', 'Injuries have interrupted his career, making every return a question of workload and explosive value.'],
    ['RR fit', '2026', 'Franchise', 'For Rajasthan, Archer is the premium pace weapon if fit: powerplay threat, middle-over fear, death-over ceiling.'],
  ],
  'Nandre Burger': [
    ['South African left-arm pace', '1995', 'Origin', 'Burger emerged as a left-arm quick with pace, bounce, and wicket-taking aggression.'],
    ['South Africa debut', '2023', 'Debut', 'Made his South Africa debut across formats in 2023, quickly showing white-ball and red-ball promise.'],
    ['India series impact', '2023-2024', 'Breakthrough', 'His early international spells against India gave him credibility beyond domestic cricket.'],
    ['RR pace role', '2024', 'Franchise', 'Joined Rajasthan as a left-arm pace option who could change powerplay matchups.'],
    ['Skill profile', '2020s', 'Role', 'His value is angle and aggression: attacking right-handers from over the wicket and rushing batters.'],
    ['RR fit', '2026', 'Franchise', 'For Rajasthan, Burger gives left-arm pace depth behind bigger-name quicks.'],
  ],
}

function getRoleGroup(name, explicitRole) {
  if (explicitRole) return explicitRole
  if (wicketkeepers.has(name)) return 'keeper'
  if (allrounders.has(name)) return 'allrounder'
  if (bowlers.has(name)) return 'bowler'
  return 'batter'
}

function hasVerificationPlaceholder(timeline) {
  return timeline.some(([, , tag, detail]) => {
    const text = `${tag} ${detail}`.toLowerCase()

    return (
      tag === 'Verify' ||
      text.includes('should be checked') ||
      text.includes('should be verified') ||
      text.includes('verify before publication') ||
      text.includes('no clear public comeback narrative found')
    )
  })
}

function getPlayerNumber(name, rosterIndex) {
  return knownJerseyNumbers[name] ?? String(rosterIndex + 1).padStart(2, '0')
}

function hexToRgb(hex) {
  const value = hex.replace('#', '')
  const normalized = value.length === 3 ? value.split('').map((character) => character + character).join('') : value
  const number = Number.parseInt(normalized, 16)

  return `${(number >> 16) & 255}, ${(number >> 8) & 255}, ${number & 255}`
}

function getColorVars(colors) {
  return {
    '--accent': colors.accent,
    '--accent-rgb': hexToRgb(colors.accent),
    '--secondary': colors.secondary,
    '--secondary-rgb': hexToRgb(colors.secondary),
    '--team-accent': colors.accent,
    '--team-secondary': colors.secondary,
    '--team-tertiary': colors.tertiary ?? colors.secondary,
  }
}

function getPlayerAnimationProfile(name, nationality, team, rosterIndex, explicitRole) {
  const featured = featuredAnimations[name]
  const number = getPlayerNumber(name, rosterIndex)
  const role = getRoleGroup(name, explicitRole)
  const roleLabel = roleLabels[role]
  const highlight = playerHighlights[name] ?? {
    early:
      nationality === 'India'
        ? `${name}'s early pathway runs through Indian domestic, age-group, academy, or state-cricket competition before the IPL squad stage.`
        : `${name}'s early pathway runs through ${nationality}'s cricket structure and franchise opportunities before entering this IPL squad context.`,
    debut:
      nationality === 'India'
        ? `India pathway: domestic cricket, IPL selection, and national-team contention shape ${name}'s profile.`
        : `${nationality} pathway: international or franchise cricket experience shapes ${name}'s IPL value.`,
    influence: `${name}'s influential performances are framed through ${roleLabel.toLowerCase()} role execution, pressure moments, and fit inside ${team.shortName}'s tactical plans.`,
    best: `${name}'s best-season window is measured through availability, selection trust, role clarity, and repeatable impact for ${team.shortName}.`,
  }
  const spreadsheetTimeline = spreadsheetCareerTimelines[name]
  const usableSpreadsheetTimeline =
    spreadsheetTimeline && !hasVerificationPlaceholder(spreadsheetTimeline) ? spreadsheetTimeline : undefined
  const explicitTimeline = highlight.timeline ?? usableSpreadsheetTimeline ?? internationalCareerTimelines[name]

  if (featured) {
    return {
      ...featured,
      subtitle: `${team.shortName} 2026 squad · ${roleLabel} · ${nationality}`,
      number,
    }
  }

  if (explicitTimeline) {
    return {
      name,
      number,
      subtitle: `${team.shortName} 2026 squad · ${roleLabel} · ${nationality}`,
      theme: 'team-player',
      range: explicitTimeline.at(-1)?.[1] ?? '2026',
      nodes: explicitTimeline.map(([title, year, tag, detail], index) => ({
        title,
        year,
        tag,
        detail,
        frame: 45 + index * 58,
      })),
      bars: explicitTimeline.slice(0, 8).map(([title, year], index) => ({
        year,
        nodeTitle: title,
        label: title.split(' ').slice(0, 2).join(' '),
        value: Math.min(96, 48 + index * 7),
        frame: 65 + index * 48,
      })),
      portals: ['Early life', 'Debut', 'Milestones', 'Trophies', 'Peak seasons', 'Franchise role'],
    }
  }

  return {
    name,
    number,
    subtitle: `${team.shortName} 2026 squad · ${roleLabel} · ${nationality}`,
    theme: 'team-player',
    range: '2026 IPL squad',
    nodes: [
      {
        title: 'Early pathway',
        year: nationality,
        tag: 'Origin',
        frame: 45,
        detail: highlight.early,
      },
      {
        title: 'Debut checkpoint',
        year: 'Debut',
        tag: 'Launch',
        frame: 105,
        detail: highlight.debut,
      },
      {
        title: role === 'bowler' ? 'Influential spell' : 'Influential innings',
        year: 'Impact',
        tag: 'Memory',
        frame: 175,
        detail: highlight.influence,
      },
      {
        title: 'Best seasons',
        year: 'Peak',
        tag: 'Form',
        frame: 245,
        detail: highlight.best,
      },
      {
        title: 'Winning value',
        year: 'Wins',
        tag: 'Pressure',
        frame: 285,
        detail:
          highlight.franchise ??
          `${name}'s winning value for ${team.shortName} is judged by whether the ${roleLabel.toLowerCase()} role holds up when game state, venue, and opposition matchup all change.`,
      },
      {
        title: `${team.shortName} squad entry`,
        year: '2026',
        tag: 'Franchise',
        frame: 345,
        detail: `${team.shortName} carries ${name} in a roster built around captain ${team.captain}, role coverage, matchup flexibility, and tactical depth across the season.`,
      },
      {
        title: 'Matchday responsibility',
        year: 'XI',
        tag: 'Role',
        frame: 425,
        detail: `${name}'s matchday value is framed through role competition, entry point, pressure phase, and the specific job ${team.name} needs filled against different opponents.`,
      },
      {
        title: 'Future fan signal',
        year: 'Story',
        tag: 'Fans',
        frame: 505,
        detail: `For supporters, ${name} becomes one more node in the larger ${team.shortName} story: jersey number, nationality, role expectation, and team colors moving together.`,
      },
    ],
    bars: [
      { year: nationality, label: 'Nation', value: 54, frame: 65 },
      { year: 'Debut', label: 'Path', value: 64, frame: 125 },
      { year: 'Impact', label: 'Memory', value: 74, frame: 185 },
      { year: 'Peak', label: 'Season', value: 78, frame: 245 },
      { year: 'Wins', label: 'Value', value: 72, frame: 285 },
      { year: '2026', label: team.shortName, value: 82, frame: 345 },
      { year: 'XI', label: 'Role', value: 68, frame: 405 },
    ],
    portals: ['Early pathway', 'Debut path', 'Influential performance', 'Best seasons', 'Winning value', 'Fan connection'],
  }
}

function getEventPosition(index, total, isCompact) {
  if (isCompact) {
    const columns = 3
    const row = Math.floor(index / columns)
    const column = index % columns
    const xStep = columns > 1 ? 68 / (columns - 1) : 0

    return {
      x: 16 + column * xStep,
      y: 12 + row * 24,
    }
  }

  const topCount = Math.ceil(total / 2)
  const bottomCount = Math.floor(total / 2)
  const rowIndex = Math.floor(index / 2)
  const isTopRow = index % 2 === 0
  const count = isTopRow ? topCount : bottomCount
  const start = isTopRow ? 8 : 16
  const end = isTopRow ? 92 : 84
  const step = count > 1 ? (end - start) / (count - 1) : 0

  return {
    x: start + rowIndex * step,
    y: isTopRow ? 23 : 73,
  }
}

function useIsCompactLayout() {
  const [isCompact, setIsCompact] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth <= 640 : false
  })

  useEffect(() => {
    const handleResize = () => setIsCompact(window.innerWidth <= 640)

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isCompact
}

class AppErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <main className="app-shell">
          <section className="app-error">
            <strong>Something failed while loading this page.</strong>
            <p>{this.state.error.message}</p>
          </section>
        </main>
      )
    }

    return this.props.children
  }
}

function usePlayback() {
  const [frame, setFrame] = useState(1)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setFrame((current) => {
        if (current >= 720) {
          window.clearInterval(timer)
          return 720
        }

        return Math.min(720, current + 6)
      })
    }, 45)

    return () => window.clearInterval(timer)
  }, [])

  return frame
}

function NetworkLine({ node, visible }) {
  const center = { x: 50, y: 48 }
  const dx = node.x - center.x
  const dy = node.y - center.y
  const length = Math.sqrt(dx * dx + dy * dy)
  const angle = Math.atan2(dy, dx) * (180 / Math.PI)

  return (
    <span
      className={visible ? 'network-line visible' : 'network-line'}
      style={{
        left: `${center.x}%`,
        top: `${center.y}%`,
        width: `${length}%`,
        transform: `rotate(${angle}deg)`,
      }}
    />
  )
}

function KnowledgeNetwork({ player, frame, sectionId, colors, embedded = false }) {
  const isCompact = useIsCompactLayout()
  const toneStyle = colors ? getColorVars(colors) : undefined
  const positionedNodes = useMemo(() => {
    return player.nodes.map((node, index) => ({
      ...node,
      detail: node.detail ?? eventDetails[node.title] ?? `${node.title} shaped ${player.name}'s career arc in ${node.year}.`,
      ...getEventPosition(index, player.nodes.length, isCompact),
    }))
  }, [isCompact, player.name, player.nodes])
  const currentNode = useMemo(() => {
    return positionedNodes.reduce((latest, node) => {
      if (frame >= node.frame && node.frame >= latest.frame) {
        return node
      }
      return latest
    }, positionedNodes[0])
  }, [frame, positionedNodes])
  const [selectedNodeTitle, setSelectedNodeTitle] = useState(null)
  const selectedNode = useMemo(() => {
    return positionedNodes.find((node) => node.title === selectedNodeTitle) ?? currentNode
  }, [currentNode, positionedNodes, selectedNodeTitle])
  const selectedBar = useMemo(() => {
    return (
      player.bars.find((bar) => {
        if (bar.nodeTitle) {
          return bar.nodeTitle === selectedNode.title
        }

        return bar.year === selectedNode.year
      }) ?? player.bars[0]
    )
  }, [player.bars, selectedNode.title, selectedNode.year])

  return (
    <section
      className={`network-stage ${player.theme} ${embedded ? 'embedded' : ''}`}
      id={sectionId}
      style={toneStyle}
      aria-label={`${player.name} animated knowledge network`}
    >
      <div className="stage-header">
        <div className="identity">
          <span>{player.number}</span>
          <div>
            <strong>{player.name}</strong>
            <small>{player.subtitle}</small>
          </div>
        </div>

        <div className="mode-label">
          <span>{player.range}</span>
          <small>Living Knowledge Network</small>
        </div>
      </div>

      <div className="network-map">
        <div className="aura aura-one" />
        <div className="aura aura-two" />

        {positionedNodes.map((node) => (
          <NetworkLine node={node} visible={frame >= node.frame} key={`line-${node.title}`} />
        ))}

        <div className="core-node">
          <span>{player.number}</span>
          <strong>{player.name}</strong>
        </div>

        {positionedNodes.map((node) => (
          <button
            className={[
              'career-node',
              frame >= node.frame ? 'visible' : '',
              selectedNode.title === node.title ? 'selected' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            key={node.title}
            onClick={() => setSelectedNodeTitle(node.title)}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            type="button"
          >
            <span>{node.year}</span>
            <strong>{node.title}</strong>
            <small>{node.tag}</small>
          </button>
        ))}

        <div className="particle-field">
          {Array.from({ length: 34 }, (_, index) => (
            <span
              className={frame > 280 + index * 5 ? 'particle visible' : 'particle'}
              key={index}
              style={{
                '--angle': `${index * 24}deg`,
                '--distance': `${90 + index * 5}px`,
                '--delay': `${index * 38}ms`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="lower-grid">
        <div className="momentum-panel">
          <div className="panel-heading">
            <h2>Career Momentum</h2>
            <span>{selectedNode.year}</span>
          </div>
          <div className="bar-row">
            {player.bars.map((bar) => (
              <button
                className={bar === selectedBar ? 'bar-item selected' : 'bar-item'}
                key={`${bar.year}-${bar.nodeTitle ?? bar.label}`}
                onClick={() => {
                  const nextNode = positionedNodes.find((node) => {
                    if (bar.nodeTitle) {
                      return node.title === bar.nodeTitle
                    }

                    return node.year === bar.year
                  })
                  setSelectedNodeTitle(nextNode?.title ?? selectedNode.title)
                }}
                type="button"
              >
                <div className="bar-shell">
                  <span
                    style={{
                      height: frame >= bar.frame ? `${bar.value}%` : '2%',
                    }}
                  />
                </div>
                <strong>{bar.year}</strong>
                <small>{bar.label}</small>
              </button>
            ))}
          </div>
          <div className="event-detail-bar">
            <div className="detail-meter">
              <span style={{ width: `${selectedBar.value}%` }} />
            </div>
            <div>
              <strong>{selectedNode.title}</strong>
              <p>{selectedNode.detail}</p>
            </div>
          </div>
        </div>

        <div className="portal-panel">
          <h2>Influence Portals</h2>
          <div>
            {player.portals.map((portal, index) => (
              <span className={frame >= 90 + index * 55 ? 'portal visible' : 'portal'} key={portal}>
                {portal}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TeamSquadAnimation({ team, frame }) {
  const orderedPlayers = useMemo(() => {
    return [...team.players].sort(([leftName, , leftRole], [rightName, , rightRole]) => {
      if (leftName === team.captain) return -1
      if (rightName === team.captain) return 1
      const roleDifference = roleOrder[getRoleGroup(leftName, leftRole)] - roleOrder[getRoleGroup(rightName, rightRole)]

      return roleDifference || leftName.localeCompare(rightName)
    })
  }, [team.captain, team.players])
  const defaultPlayerName = useMemo(() => {
    return orderedPlayers.find(([name]) => name === team.captain)?.[0] ?? orderedPlayers[0][0]
  }, [orderedPlayers, team.captain])
  const [selectedPlayerName, setSelectedPlayerName] = useState(defaultPlayerName)
  const selectedPlayerIndex = orderedPlayers.findIndex(([name]) => name === selectedPlayerName)
  const selectedPlayer = orderedPlayers[selectedPlayerIndex] ?? orderedPlayers[0]
  const selectedProfile = useMemo(() => {
    return getPlayerAnimationProfile(
      selectedPlayer[0],
      selectedPlayer[1],
      team,
      Math.max(0, selectedPlayerIndex),
      selectedPlayer[2],
    )
  }, [selectedPlayer, selectedPlayerIndex, team])
  const visibleCount = Math.min(orderedPlayers.length, Math.max(0, Math.floor((frame - 35) / 18)))
  const overseasCount = orderedPlayers.filter(([, nationality]) => nationality !== 'India').length

  return (
    <section
      className={`team-squad-stage ${team.id}`}
      id={`${team.id}-team`}
      style={{
        '--team-accent': team.colors.accent,
        '--team-secondary': team.colors.secondary,
        '--team-tertiary': team.colors.tertiary ?? team.colors.secondary,
      }}
      aria-label={`${team.name} 2026 squad visualization`}
    >
      <div className="team-squad-header">
        <div className="team-mark">
          <span>{team.shortName}</span>
        </div>
        <div>
          <h2>{team.name}</h2>
          <p>
            Captain: {team.captain} · {orderedPlayers.length} players · {overseasCount} overseas
          </p>
        </div>
      </div>

      <div className="team-squad-layout">
        <div className="team-roster-grid">
          {orderedPlayers.map(([name, nationality, role], index) => (
            <button
              className={[
                'team-player-card',
                index < visibleCount ? 'visible' : '',
                selectedPlayerName === name ? 'selected' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              key={`${team.id}-${name}`}
              onClick={() => setSelectedPlayerName(name)}
              style={{ '--delay': `${index * 24}ms` }}
              type="button"
            >
              <span>{getPlayerNumber(name, index)}</span>
              <strong>
                {name}
                {name === team.captain ? ' (C)' : ''}
              </strong>
              <small>{nationality}</small>
              <em>{roleLabels[getRoleGroup(name, role)]}</em>
            </button>
          ))}
        </div>

        <KnowledgeNetwork
          colors={team.colors}
          embedded
          frame={frame}
          player={selectedProfile}
          sectionId={`${team.id}-${selectedPlayerName.toLowerCase().replaceAll(' ', '-')}-visualization`}
        />
      </div>
    </section>
  )
}

function VisualizationsPage({ frame }) {
  return (
    <div className="animations-page">
      <nav className="animation-scrollbar" aria-label="Visualization sections">
        <div className="scrollbar-track">
          {iplTeams.map((team, index) => (
            <a
              href={`#${team.id}-team`}
              key={team.id}
              aria-label={`Jump to ${team.name} squad`}
              data-team={team.shortName}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
            </a>
          ))}
        </div>
      </nav>

      <div className="team-squad-page">
        {iplTeams.map((team) => (
          <TeamSquadAnimation frame={frame} key={team.id} team={team} />
        ))}
      </div>
    </div>
  )
}

function scoreProfiles(answers) {
  const traitNames = ['calm', 'ambition', 'risk', 'creativity', 'resilience', 'leadership', 'flair', 'teamwork']
  const traitSamples = traitNames.reduce((samples, trait) => ({ ...samples, [trait]: [] }), {})
  const selectedAnswers = Object.entries(answers)
    .filter(([, optionIndex]) => optionIndex !== undefined)
    .map(([questionIndex, optionIndex]) => ({
      questionIndex: Number(questionIndex),
      optionIndex,
      option: quizQuestions[Number(questionIndex)].options[optionIndex],
    }))
  const selectedOptions = selectedAnswers.map(({ option }) => option)

  selectedOptions.forEach((option) => {
    Object.entries(option.scores).forEach(([trait, value]) => {
      traitSamples[trait].push(Math.max(0, Math.min(100, 50 + value * 2.75)))
    })
  })

  const userTraits = traitNames.reduce((traits, trait) => {
    const samples = traitSamples[trait]
    const value = samples.length
      ? Math.round(samples.reduce((total, sample) => total + sample, 0) / samples.length)
      : 50

    return { ...traits, [trait]: value }
  }, {})

  const decisiveLane = [...selectedAnswers]
    .reverse()
    .map(({ option }) => Object.entries(option.profileBoosts ?? {}).filter(([, boost]) => boost >= 55).map(([name]) => name))
    .find((names) => names.length > 0)
  const answerSignature = selectedAnswers.map(({ questionIndex, optionIndex }) => `${questionIndex}:${optionIndex}`).join('|')
  const signatureHash = [...answerSignature].reduce((hash, character) => {
    return (hash * 31 + character.charCodeAt(0)) % 1000003
  }, 17)
  const laneWinner = decisiveLane?.[signatureHash % decisiveLane.length]

  const optionBoostForProfile = (profile) => {
    const answerBoost = selectedOptions.reduce((boost, option) => {
      const directBoost = option.profileBoosts?.[profile.name] ?? 0
      const countryBoost = option.countryBoosts?.[profile.country] ?? 0
      const roleBoost =
        option.roleBoosts?.some((roleSignal) => profile.role.toLowerCase().includes(roleSignal.toLowerCase())) ? 8 : 0

      return boost + directBoost + countryBoost + roleBoost
    }, 0)

    if (!decisiveLane?.includes(profile.name)) {
      return answerBoost
    }

    return answerBoost + (profile.name === laneWinner ? 190 : 85)
  }

  if (!selectedOptions.length) {
    return cricketerProfiles.map((profile) => ({ ...profile, match: 50 })).sort((a, b) => a.name.localeCompare(b.name))
  }

  return cricketerProfiles
    .map((profile) => {
      const weightedDistance = traitNames.reduce((total, trait) => {
        const difference = Math.abs(userTraits[trait] - profile.traits[trait])
        const answeredWeight = traitSamples[trait].length ? 1.15 : 0.55

        return total + difference * answeredWeight
      }, 0)
      const profileBoost = optionBoostForProfile(profile)
      const score = 100 - weightedDistance / 6 + profileBoost
      const match = Math.max(1, Math.min(99, Math.round(100 - weightedDistance / 7 + Math.min(profileBoost, 40) / 4)))

      return { ...profile, match, score }
    })
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
}

function FanPersonalityTest() {
  const [answers, setAnswers] = useState({})
  const [showResult, setShowResult] = useState(false)
  const answeredCount = Object.keys(answers).length
  const isComplete = answeredCount === quizQuestions.length
  const results = useMemo(() => scoreProfiles(answers), [answers])
  const winner = results[0]
  const runnersUp = results.slice(1, 4)
  const progress = Math.round((answeredCount / quizQuestions.length) * 100)
  const traitLabels = {
    calm: 'Calm',
    ambition: 'Ambition',
    risk: 'Risk',
    creativity: 'Creativity',
    resilience: 'Resilience',
    leadership: 'Leadership',
    flair: 'Flair',
    teamwork: 'Teamwork',
  }
  const topTraits = useMemo(() => {
    return Object.entries(winner.traits)
      .sort(([, leftValue], [, rightValue]) => rightValue - leftValue)
      .slice(0, 4)
  }, [winner.traits])

  return (
    <section className="fan-stage" aria-label="Cricketer personality test">
      <div className="fan-hero">
        <div>
          <span className="fan-kicker">Fan Quiz</span>
          <h1>Find your cricket twin.</h1>
          <p>Answer every prompt, then submit to reveal your match.</p>
          <div className="fan-hero-stats" aria-label="Fan test stats">
            <span>
              <strong>{cricketerProfiles.length}</strong>
              Player profiles
            </span>
            <span>
              <strong>{quizQuestions.length}</strong>
              Match prompts
            </span>
            <span>
              <strong>{progress}%</strong>
              Signal locked
            </span>
          </div>
        </div>
      </div>

      <div className="quiz-layout">
        <div className="question-stack">
          {quizQuestions.map((question, questionIndex) => (
            <article className="quiz-question" key={question.prompt} style={{ '--question-index': questionIndex }}>
              <div className="question-title">
                <span>{String(questionIndex + 1).padStart(2, '0')}</span>
                <h2>{question.prompt}</h2>
              </div>
              <div className="answer-grid">
                {question.options.map((option, optionIndex) => (
                  <button
                    className={answers[questionIndex] === optionIndex ? 'selected' : ''}
                    key={option.label}
                    onClick={() => {
                      setAnswers((current) => ({ ...current, [questionIndex]: optionIndex }))
                      setShowResult(false)
                    }}
                    type="button"
                  >
                    <span className="answer-mark" aria-hidden="true" />
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </article>
          ))}
        </div>

        <aside className="result-panel">
          <div className="fan-scoreboard" aria-label="Quiz progress" style={{ '--progress': `${progress * 3.6}deg` }}>
            <div className="score-orbit">
              <strong>{answeredCount}</strong>
              <span>/ {quizQuestions.length}</span>
            </div>
            <small>{progress}% answered</small>
          </div>

          <div className="result-card">
            {showResult ? (
              <>
                <div className="result-card-top">
                  <span>Your Match</span>
                  <a href={winner.wikipedia} rel="noreferrer" target="_blank">
                    Profile
                  </a>
                </div>
                <div className="result-player-lockup">
                  <div>
                    <strong>{winner.name}</strong>
                    <small>
                      {winner.country} · {winner.role}
                    </small>
                  </div>
                  <div className="match-ring" style={{ '--match': `${winner.match * 3.6}deg` }}>
                    <b>{winner.match}%</b>
                  </div>
                </div>
                <h2>{winner.archetype}</h2>
                <p>{winner.matchLine}</p>

                <div className="trait-signal" aria-label="Top matched traits">
                  {topTraits.map(([trait, value]) => (
                    <div className="trait-row" key={trait}>
                      <span>{traitLabels[trait]}</span>
                      <div>
                        <i style={{ width: `${value}%` }} />
                      </div>
                      <strong>{value}</strong>
                    </div>
                  ))}
                </div>

                <div className="evidence-list">
                  {winner.evidence.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </>
            ) : (
              <div className="result-pending">
                <span>Result Locked</span>
                <strong>
                  {answeredCount}/{quizQuestions.length}
                </strong>
                <p>{isComplete ? 'Submit when ready to reveal your cricketer.' : 'Complete every question to unlock your match.'}</p>
              </div>
            )}

            <div className="result-actions">
              <button
                disabled={!isComplete}
                onClick={() => setShowResult(true)}
                type="button"
              >
                Submit Quiz
              </button>
              <button
                onClick={() => {
                  setAnswers({})
                  setShowResult(false)
                }}
                type="button"
              >
                Reset
              </button>
            </div>
          </div>

          {showResult && (
            <div className="runner-panel">
              <h2>Also Close</h2>
              {runnersUp.map((player) => (
                <div className="runner-row" key={player.name}>
                  <span>{player.match}%</span>
                  <div>
                    <strong>{player.name}</strong>
                    <small>{player.archetype}</small>
                    <div className="runner-meter">
                      <i style={{ width: `${player.match}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </aside>
      </div>

      <div className="player-cloud" aria-label="Available cricketer match pool">
        <div className="cloud-heading">
          <span>Match Pool</span>
          <strong>{cricketerProfiles.length} cricketers</strong>
        </div>
        <div className="cloud-links">
          {cricketerProfiles.map((profile) => (
            <a href={profile.wikipedia} key={profile.name} rel="noreferrer" target="_blank">
              {profile.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function App() {
  const getInitialView = () => {
    if (typeof window !== 'undefined' && window.location.pathname === '/fan-test') {
      return 'fan'
    }

    return 'animations'
  }
  const [activeView, setActiveView] = useState(getInitialView)
  const frame = usePlayback()
  const changeView = (view) => {
    const path = view === 'fan' ? '/fan-test' : '/'
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path)
    }
    setActiveView(view)
  }

  useEffect(() => {
    const handlePopState = () => {
      setActiveView(window.location.pathname === '/fan-test' ? 'fan' : 'animations')
    }

    window.addEventListener('popstate', handlePopState)

    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  return (
    <main
      className="app-shell"
      onPointerMove={(event) => {
        const x = Math.round((event.clientX / window.innerWidth) * 100)
        const y = Math.round((event.clientY / window.innerHeight) * 100)

        event.currentTarget.style.setProperty('--pointer-x', `${x}%`)
        event.currentTarget.style.setProperty('--pointer-y', `${y}%`)
      }}
      style={{ '--pointer-x': '50%', '--pointer-y': '34%' }}
    >
      <div className="interactive-backdrop" aria-hidden="true" />
      <nav className="player-switch" aria-label="Primary navigation">
        <button
          className={activeView === 'animations' ? 'active' : ''}
          onClick={() => changeView('animations')}
          type="button"
        >
          Visualizations
        </button>
        <button
          className={activeView === 'fan' ? 'active' : ''}
          onClick={() => changeView('fan')}
          type="button"
        >
          Fan Test
        </button>
      </nav>

      {activeView === 'fan' ? (
        <FanPersonalityTest />
      ) : (
        <VisualizationsPage frame={frame} />
      )}
    </main>
  )
}

export default App

export function RootApp() {
  return (
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  )
}
