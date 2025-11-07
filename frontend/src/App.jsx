import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import BotHeader from './Components/BotHeader'
import MessageList from './Components/MessageList'
import QuickPrompts from './Components/QuickPrompts'
import ChatInput from './Components/ChatInput'
import API_BASE_URL from './config/api'

// Function to format markdown-style text
const formatMessage = (text) => {
  const lines = text.split('\n')

  return lines.map((line, lineIndex) => {
    // Check if it's a bullet point line
    const isBulletPoint = /^\s*\*\s+(?!\*)/.test(line)
    
    if (isBulletPoint) {
      // Remove the bullet asterisk and format the rest
      const content = line.replace(/^\s*\*\s+/, '')
      return (
        <div key={`line-${lineIndex}`} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
          <span style={{ flexShrink: 0 }}>•</span>
          <span>{formatInlineMarkdown(content, lineIndex)}</span>
        </div>
      )
    }
    
    // Regular line - format inline markdown
    return (
      <div key={`line-${lineIndex}`} style={{ marginBottom: lineIndex < lines.length - 1 ? '8px' : '0' }}>
        {formatInlineMarkdown(line, lineIndex)}
      </div>
    )
  })
}

// Helper function to format inline markdown (bold, italic, headers)
const formatInlineMarkdown = (text, lineIndex) => {
  const parts = []
  let lastIndex = 0
  
  // Regex to match: ***text*** or **text** or *text* or __text__ or ### header or ## header
  // Added support for single asterisk italic and improved matching
  const regex = /(\*\*\*([^*]+?)\*\*\*|\*\*([^*]+?)\*\*|\*([^*]+?)\*|__(.+?)__|###\s+(.+?)(?=\s|$)|##\s+(.+?)(?=\s|$))/g
  
  let match
  while ((match = regex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(
        <span key={`text-${lineIndex}-${lastIndex}`}>
          {text.substring(lastIndex, match.index)}
        </span>
      )
    }
    
    // Add formatted text
    if (match[2]) {
      // ***text*** - bold + italic
      parts.push(
        <strong key={`bi-${lineIndex}-${match.index}`}>
          <em>{match[2]}</em>
        </strong>
      )
    } else if (match[3]) {
      // **text** - bold
      parts.push(
        <strong key={`b-${lineIndex}-${match.index}`}>{match[3]}</strong>
      )
    } else if (match[4]) {
      // *text* - italic
      parts.push(
        <em key={`i-${lineIndex}-${match.index}`}>{match[4]}</em>
      )
    } else if (match[5]) {
      // __text__ - bold
      parts.push(
        <strong key={`b2-${lineIndex}-${match.index}`}>{match[5]}</strong>
      )
    } else if (match[6]) {
      // ### header
      parts.push(
        <strong key={`h3-${lineIndex}-${match.index}`} style={{ fontSize: '1.1em' }}>
          {match[6]}
        </strong>
      )
    } else if (match[7]) {
      // ## header
      parts.push(
        <strong key={`h2-${lineIndex}-${match.index}`} style={{ fontSize: '1.15em' }}>
          {match[7]}
        </strong>
      )
    }
    
    lastIndex = regex.lastIndex
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(
      <span key={`text-end-${lineIndex}`}>{text.substring(lastIndex)}</span>
    )
  }
  
  return parts.length > 0 ? parts : text
}

function App() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Welcome to Nexaur Ai. I'm your AI advisor for building halal wealth through fractional real estate. Ask me to find properties, analyze rental yields, or explain our Shariah-compliant process."
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [apiStatus, setApiStatus] = useState('checking')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    checkApiHealth()
  }, [])

  const checkApiHealth = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/health`)
      setApiStatus(response.data.model_loaded ? 'ready' : 'loading')
    } catch (error) {
      setApiStatus('error')
    }
  }

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage = { role: 'user', content: input }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setLoading(true)

    try {
      const response = await axios.post(`${API_BASE_URL}/chat`, {
        messages: updatedMessages,
        max_length: 512
      })

      setMessages([
        ...updatedMessages,
        { role: 'assistant', content: response.data.response }
      ])
    } catch (error) {
      console.error('Error:', error)
      setMessages([
        ...updatedMessages,
        {
          role: 'assistant',
          content: 'I apologize, but I encountered an error. Please try again or check if the backend server is running.'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="app">
      <div className="chat-container">
        <BotHeader apiStatus={apiStatus} />

        <MessageList 
          messages={messages} 
          loading={loading} 
          messagesEndRef={messagesEndRef}
          formatMessage={formatMessage}
        />

        {messages.length === 1 && (
          <QuickPrompts setInput={setInput} />
        )}

        <ChatInput 
          input={input}
          setInput={setInput}
          handleSend={handleSend}
          handleKeyPress={handleKeyPress}
          loading={loading}
          apiStatus={apiStatus}
        />
      </div>
    </div>
  )
}

export default App
