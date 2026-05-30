import { Component, useEffect, useMemo, useState } from 'react'
import './App.css'
import { cricketerProfiles, quizQuestions } from './cricketerProfiles'
import spreadsheetCareerTimelines from './data/careerTimelines.json'
import featuredPlayers from './data/featuredPlayers.json'
import iplTeams from './data/iplTeams.json'
import playerMeta from './data/playerMeta.json'
import eventDetailsData from './data/eventDetails.json'
import playerHighlightsData from './data/playerHighlights.json'
import internationalCareerTimelinesData from './data/internationalCareerTimelines.json'
import heroImage from './assets/hero.png'

const players = featuredPlayers

const eventDetails = eventDetailsData

const featuredAnimations = Object.values(players).reduce((animations, player) => {
  animations[player.name] = player
  return animations
}, {})

const knownJerseyNumbers = playerMeta.jerseyNumbers

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

const wicketkeepers = new Set(playerMeta.roleGroups.wicketkeepers)
const allrounders = new Set(playerMeta.roleGroups.allrounders)
const bowlers = new Set(playerMeta.roleGroups.bowlers)

const playerHighlights = playerHighlightsData

const internationalCareerTimelines = internationalCareerTimelinesData

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

function HomePage({ onNavigate }) {
  const featuredPlayers = ['Virat Kohli', 'MS Dhoni', 'Rohit Sharma', 'Jasprit Bumrah', 'Ruturaj Gaikwad']
    .map((name) => featuredAnimations[name] ?? getPlayerAnimationProfile(name, 'India', iplTeams[0], 0, 'batter'))

  return (
    <section className="home-page">
      <section className="home-hero" style={{ '--hero-image': `url(${heroImage})` }}>
        <div className="home-hero-content">
          <span>IPL Fan Intelligence</span>
          <h1>Turn cricket fandom into interactive player stories.</h1>
          <p>
            Explore IPL squads, compare career timelines, and take a fan quiz that maps your instincts to a cricket
            profile.
          </p>
          <div className="home-actions">
            <button onClick={() => onNavigate('visualizations')} type="button">
              Explore player timelines
            </button>
            <button onClick={() => onNavigate('fan')} type="button">
              Take the fan quiz
            </button>
          </div>
        </div>
      </section>

      <section className="home-band" aria-label="Choose your IPL team">
        <div className="home-section-heading">
          <span>Choose your IPL team</span>
          <h2>Start with a squad, then inspect every player.</h2>
        </div>
        <div className="home-team-grid">
          {iplTeams.map((team) => (
            <button
              key={team.id}
              onClick={() => {
                onNavigate('visualizations')
                window.setTimeout(() => document.getElementById(`${team.id}-team`)?.scrollIntoView(), 80)
              }}
              style={{ '--team-accent': team.colors.accent, '--team-secondary': team.colors.secondary }}
              type="button"
            >
              <span>{team.shortName}</span>
              <strong>{team.name}</strong>
              <small>Captain: {team.captain}</small>
            </button>
          ))}
        </div>
      </section>

      <section className="home-band split" aria-label="Product paths">
        <div>
          <span>Take the fan quiz</span>
          <h2>Match your pressure style to a cricketer.</h2>
          <p>Answer role, tempo, leadership, and risk questions. Your player is hidden until you submit.</p>
          <button onClick={() => onNavigate('fan')} type="button">
            Start quiz
          </button>
        </div>
        <div>
          <span>Explore player timelines</span>
          <h2>See career moments as living visual networks.</h2>
          <p>Jump into team rosters, switch players, and review debuts, trophies, comebacks, and 2026 squad context.</p>
          <button onClick={() => onNavigate('visualizations')} type="button">
            Open visualizations
          </button>
        </div>
      </section>

      <section className="home-band" aria-label="Featured player carousel">
        <div className="home-section-heading">
          <span>Featured player carousel</span>
          <h2>Fast entry points into recognizable career arcs.</h2>
        </div>
        <div className="featured-carousel">
          {featuredPlayers.map((player) => (
            <button key={player.name} onClick={() => onNavigate('visualizations')} type="button">
              <span>{player.number}</span>
              <strong>{player.name}</strong>
              <small>{player.range}</small>
            </button>
          ))}
        </div>
      </section>
    </section>
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

    if (typeof window !== 'undefined' && window.location.pathname === '/visualizations') {
      return 'visualizations'
    }

    return 'home'
  }
  const [activeView, setActiveView] = useState(getInitialView)
  const frame = usePlayback()
  const changeView = (view) => {
    const path = view === 'fan' ? '/fan-test' : view === 'visualizations' ? '/visualizations' : '/'
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path)
    }
    setActiveView(view)
  }

  useEffect(() => {
    const handlePopState = () => {
      setActiveView(
        window.location.pathname === '/fan-test'
          ? 'fan'
          : window.location.pathname === '/visualizations'
            ? 'visualizations'
            : 'home',
      )
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
          className={activeView === 'home' ? 'active' : ''}
          onClick={() => changeView('home')}
          type="button"
        >
          Home
        </button>
        <button
          className={activeView === 'visualizations' ? 'active' : ''}
          onClick={() => changeView('visualizations')}
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

      {activeView === 'home' ? (
        <HomePage onNavigate={changeView} />
      ) : activeView === 'fan' ? (
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
