import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import api from '../../utils/api';
import './SQLStudio.scss';

const SQLStudio = ({ assignmentId, onBack }) => {
    const [assignment, setAssignment] = useState(null);
    const [query, setQuery] = useState('SELECT * FROM products;');
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const [hint, setHint] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        api.get(`/assignments/${assignmentId}`)
            .then(res => setAssignment(res.data))
            .catch(err => console.error(err));
    }, [assignmentId]);

    const handleExecute = async () => {
        setLoading(true);
        setError(null);
        setResults(null);
        try {
            const res = await api.post('/execute', { sql: query });
            setResults(res.data);
        } catch (err) {
            setError(err.response?.data?.error || 'Execution failed');
        } finally {
            setLoading(false);
        }
    };

    const handleGetHint = async () => {
        setLoading(true);
        try {
            const res = await api.post('/hint', { assignmentId, userQuery: query });
            setHint(res.data.hint);
        } catch (err) {
            setError('Failed to fetch hint');
        } finally {
            setLoading(false);
        }
    };

    if (!assignment) return <div>Loading studio...</div>;

    return (
        <div className="sql-studio">
            <div className="sql-studio__header">
                <button className="btn" onClick={onBack}>← Back</button>
                <h2>{assignment.title}</h2>
            </div>

            <div className="sql-studio__layout">
                <div className="sql-studio__panel sql-studio__panel--left">
                    <section className="sql-studio__section">
                        <h3>Question</h3>
                        <p>{assignment.question}</p>
                    </section>

                    <section className="sql-studio__section">
                        <h3>Schema Info</h3>
                        <pre>{assignment.schemaDescription}</pre>
                    </section>

                    {assignment.sampleData && (
                        <section className="sql-studio__section">
                            <h3>Sample Data</h3>
                            {assignment.sampleData.map((table, idx) => (
                                <div key={idx} className="sample-table">
                                    <h4>{table.tableName}</h4>
                                    <div className="table-scroll">
                                        <table>
                                            <thead>
                                                <tr>{Object.keys(table.data[0] || {}).map(k => <th key={k}>{k}</th>)}</tr>
                                            </thead>
                                            <tbody>
                                                {table.data.map((row, i) => (
                                                    <tr key={i}>{Object.values(row).map((v, j) => <td key={j}>{v}</td>)}</tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ))}
                        </section>
                    )}
                </div>

                <div className="sql-studio__panel sql-studio__panel--right">
                    <div className="sql-studio__editor">
                        <Editor
                            height="40vh"
                            defaultLanguage="sql"
                            theme="vs-dark"
                            value={query}
                            onChange={(value) => setQuery(value)}
                            options={{ minimap: { enabled: false }, fontSize: 14 }}
                        />
                    </div>

                    <div className="sql-studio__actions">
                        <button className="btn btn--primary" onClick={handleExecute} disabled={loading}>
                            Execute Query
                        </button>
                        <button className="btn btn--accent" onClick={handleGetHint} disabled={loading}>
                            Get Hint
                        </button>
                    </div>

                    <div className="sql-studio__results">
                        {loading && <p>Processing...</p>}
                        {error && <div className="error-box">{error}</div>}
                        {hint && <div className="hint-box"><strong>Hint:</strong> {hint}</div>}

                        {results && (
                            <div className="results-table">
                                <h4>Query Results ({results.rows.length} rows)</h4>
                                <div className="table-scroll">
                                    <table>
                                        <thead>
                                            <tr>{results.fields.map(f => <th key={f}>{f}</th>)}</tr>
                                        </thead>
                                        <tbody>
                                            {results.rows.map((row, i) => (
                                                <tr key={i}>{results.fields.map(f => <td key={f}>{row[f]}</td>)}</tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SQLStudio;
