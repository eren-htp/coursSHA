import React, { useEffect, useState } from 'react';

// Interfaces
interface Question {
  id: number;
  text: string;
}

interface VoteResult {
  yes: number;
  no: number;
}

interface QuestionWithResults extends Question {
  results: VoteResult;
}

const ResultsDashboard: React.FC = () => {
  const [questionsWithResults, setQuestionsWithResults] = useState<QuestionWithResults[]>([]);
  const [error, setError] = useState<string>('');

  const fetchAllData = async () => {
    try {
      // 1. Récupérer toutes les questions
      const questionsResponse = await fetch('http://localhost:3000/questions');
      const allQuestions: Question[] = await questionsResponse.json();

      // 2. Pour chaque question, récupérer les résultats
      const resultsPromises = allQuestions.map(async (question) => {
        const resultResponse = await fetch(`http://localhost:3000/votes/results/${question.id}`);
        const results: VoteResult = await resultResponse.json();
        return { ...question, results };
      });

      const combinedData = await Promise.all(resultsPromises);
      setQuestionsWithResults(combinedData);
      setError(''); // Effacer les erreurs précédentes
    } catch (err) {
      console.error('Erreur lors de la récupération des données !', err);
      setError('Impossible de charger les données. Assurez-vous que le backend est en cours d\'exécution.');
    }
  };

  // Premier chargement et rafraîchissement toutes les 5 secondes
  useEffect(() => {
    fetchAllData(); // Premier chargement
    const interval = setInterval(fetchAllData, 5000); // Rafraîchit toutes les 5 secondes

    return () => clearInterval(interval); // Nettoyage
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Résultats des Votes en Direct</h1>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {questionsWithResults.length > 0 ? (
        questionsWithResults.map(item => {
          const totalVotes = item.results.yes + item.results.no;
          const yesPercentage = totalVotes > 0 ? (item.results.yes / totalVotes) * 100 : 0;
          const noPercentage = totalVotes > 0 ? (item.results.no / totalVotes) * 100 : 0;

          return (
            <div key={item.id} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px', borderRadius: '8px' }}>
              <h3>{item.text}</h3>
              <div style={{ marginTop: '10px' }}>
                <span>Oui: {item.results.yes} votes</span>
                <div style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: '4px', overflow: 'hidden', marginTop: '5px' }}>
                  <div style={{ width: `${yesPercentage}%`, backgroundColor: '#4CAF50', height: '24px', textAlign: 'center', color: 'white', lineHeight: '24px' }}>
                    {yesPercentage.toFixed(1)}%
                  </div>
                </div>
              </div>
              <div style={{ marginTop: '10px' }}>
                <span>Non: {item.results.no} votes</span>
                <div style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: '4px', overflow: 'hidden', marginTop: '5px' }}>
                  <div style={{ width: `${noPercentage}%`, backgroundColor: '#f44336', height: '24px', textAlign: 'center', color: 'white', lineHeight: '24px' }}>
                    {noPercentage.toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>En attente des résultats...</p>
      )}
    </div>
  );
};

export default ResultsDashboard;