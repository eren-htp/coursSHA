import React, { useEffect, useState } from 'react';

// Interface pour une question
interface Question {
  id: number;
  text: string;
}

const QuestionPoll: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [message, setMessage] = useState<string>('');
  const [votedQuestions, setVotedQuestions] = useState<number[]>([]);

  // Charger les questions et les votes déjà effectués
  useEffect(() => {
    // Récupérer les questions votées depuis localStorage
    const storedVotes = localStorage.getItem('votedQuestions');
    if (storedVotes) {
      setVotedQuestions(JSON.parse(storedVotes));
    }

    // Récupérer les questions depuis l'API
    fetch('http://localhost:3000/questions' )
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => {
        console.error('Erreur !', error);
        setMessage('Impossible de charger les questions.');
      });
  }, []);

  // Gérer le vote
  const handleVote = (questionId: number, answer: 'Oui' | 'Non') => {
    // Vérifier si déjà voté pour cette question
    if (votedQuestions.includes(questionId)) {
      setMessage('Vous avez déjà voté pour cette question !');
      return;
    }

    fetch('http://localhost:3000/votes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questionId, answer } )
    })
      .then(response => response.json())
      .then(() => {
        // Ajouter la question aux votes effectués
        const newVotedQuestions = [...votedQuestions, questionId];
        setVotedQuestions(newVotedQuestions);
        localStorage.setItem('votedQuestions', JSON.stringify(newVotedQuestions));
        setMessage(`Vote "${answer}" enregistré !`);
      })
      .catch(error => {
        console.error('Erreur !', error);
        setMessage('Erreur lors du vote.');
      });
  };

  // Vérifier si une question a déjà été votée
  const hasVoted = (questionId: number) => votedQuestions.includes(questionId);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Sondage</h1>
      {message && <p>{message}</p>}
      {questions.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {questions.map((question) => (
            <li key={question.id} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
              <span>{question.text}</span>
              <div style={{ marginTop: '10px' }}>
                {hasVoted(question.id) ? (
                  <span style={{ color: 'green' }}>✓ Vous avez voté</span>
                ) : (
                  <>
                    <button onClick={() => handleVote(question.id, 'Oui')} style={{ marginRight: '10px', padding: '8px 16px' }}>Oui</button>
                    <button onClick={() => handleVote(question.id, 'Non')} style={{ padding: '8px 16px' }}>Non</button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucune question à afficher.</p>
      )}
    </div>
  );
};

export default QuestionPoll;
