import { useState } from 'react';

function AnalysisSolver({ data }) {
    return (
        <div>
            {data.map((item) => (
                <div key={item.id} style={{ marginBottom: '30px' }}>
                    <h3>Zdanie: {item.sentence}</h3>
                    <table border="1" cellPadding="10">
                        <thead>
                            <tr>
                                <th>Słowo</th>
                                <th>Analiza gramatyczna</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(item.wordsAndVariety).map(([word, variety]) => (
                                <tr key={word}>
                                    <td><strong>{word}</strong></td>
                                    <td>{variety}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}

export default AnalysisSolver;