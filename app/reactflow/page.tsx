'use client'

import React, { useState, useCallback } from 'react';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';

const transportTypes = ['Lastebil', 'Tog', 'Skip', 'Droner', 'Rørledning'];

const TransportModal = ({ edge, onClose, onSave }) => {
  const [selectedTransport, setSelectedTransport] = useState(edge?.data?.transport || '');

  const handleSave = () => {
    onSave(edge.id, selectedTransport);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Velg transporttype</h3>
        <div className="transport-options">
          {transportTypes.map((type) => (
            <label key={type} className="transport-option">
              <input
                type="radio"
                name="transport"
                value={type}
                checked={selectedTransport === type}
                onChange={(e) => setSelectedTransport(e.target.value)}
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
        <div className="modal-buttons">
          <button className="btn-cancel" onClick={onClose}>Avbryt</button>
          <button className="btn-save" onClick={handleSave} disabled={!selectedTransport}>
            Lagre
          </button>
        </div>
      </div>
    </div>
  );
};

const WasteNode = ({ data }) => {
  return (
    <div className={`waste-node ${data.type}`}>
      <div className="node-icon">{data.icon}</div>
      <div className="node-label">{data.label}</div>
    </div>
  );
};

export default function WasteValueChain() {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: '1',
      data: { label: 'Restavfall', icon: '🗑️', type: 'source' },
      position: { x: 0, y: 0 },
      type: 'default',
    },
  ]);

  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [nodeCounter, setNodeCounter] = useState(2);

  const onConnect = useCallback(
    (connection) => {
      const newEdge = {
        ...connection,
        id: `${connection.source}-${connection.target}-${Date.now()}`,
        data: { transport: '' },
        label: '?',
        markerEnd: { type: MarkerType.ArrowClosed },
        style: { stroke: '#8b9f4d', strokeWidth: 3 },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  const handleEdgeClick = (event, edge) => {
    event.stopPropagation();
    setSelectedEdge(edge);
  };

  const handleTransportSave = (edgeId, transport) => {
    setEdges((eds) =>
      eds.map((e) =>
        e.id === edgeId
          ? { ...e, data: { transport }, label: transport }
          : e
      )
    );
    setSelectedEdge(null);
  };

  const addNode = () => {
    const newNodeId = String(nodeCounter);
    const newNode = {
      id: newNodeId,
      data: { label: 'Ny stasjon', icon: '⚙️', type: 'process' },
      position: {
        x: Math.random() * 300 - 150,
        y: Math.random() * 300 + 150,
      },
      type: 'default',
    };
    setNodes((nds) => [...nds, newNode]);
    setNodeCounter(nodeCounter + 1);
  };

  return (
    <div className="waste-chain-container">
      <style>{`
        * {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
        }

        .waste-chain-container {
          width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
          background: linear-gradient(135deg, #f5f7f0 0%, #e8ebe2 100%);
        }

        .header {
          padding: 24px 32px;
          background: linear-gradient(135deg, #2d3a1f 0%, #3d4a2f 100%);
          color: #fff;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 600;
          letter-spacing: -0.5px;
        }

        .header p {
          margin: 4px 0 0 0;
          font-size: 14px;
          opacity: 0.85;
        }

        .flow-wrapper {
          flex: 1;
          position: relative;
          overflow: hidden;
        }

        .controls-panel {
          position: absolute;
          top: 20px;
          right: 20px;
          z-index: 10;
          display: flex;
          gap: 12px;
          background: rgba(255, 255, 255, 0.95);
          padding: 16px 20px;
          border-radius: 12px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
        }

        .btn {
          padding: 10px 16px;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .btn-add {
          background: #8b9f4d;
          color: white;
        }

        .btn-add:hover {
          background: #7a8d42;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(139, 159, 77, 0.3);
        }

        .waste-node {
          background: white;
          border: 3px solid #8b9f4d;
          border-radius: 12px;
          padding: 16px 20px;
          text-align: center;
          min-width: 140px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: all 0.2s;
          cursor: move;
          position: relative;
        }

        .waste-node:hover {
          box-shadow: 0 8px 20px rgba(139, 159, 77, 0.2);
          transform: translateY(-2px);
        }

        .waste-node.source {
          border-color: #d4495e;
          background: linear-gradient(135deg, #fff5f5 0%, #ffe8eb 100%);
        }

        .waste-node.process {
          border-color: #5a8fb4;
          background: linear-gradient(135deg, #f0f5ff 0%, #e0ecff 100%);
        }

        .node-icon {
          font-size: 32px;
          margin-bottom: 8px;
        }

        .node-label {
          font-size: 14px;
          font-weight: 600;
          color: #2d3a1f;
          white-space: nowrap;
        }

        .edge-label {
          background: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          color: #8b9f4d;
          border: 1px solid #8b9f4d;
          cursor: pointer;
          transition: all 0.2s;
        }

        .edge-label:hover {
          background: #8b9f4d;
          color: white;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          max-width: 400px;
          width: 90%;
        }

        .modal-content h3 {
          margin: 0 0 24px 0;
          font-size: 20px;
          font-weight: 600;
          color: #2d3a1f;
        }

        .transport-options {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
        }

        .transport-option {
          display: flex;
          align-items: center;
          padding: 12px;
          border-radius: 8px;
          background: #f5f7f0;
          cursor: pointer;
          transition: all 0.2s;
          border: 2px solid transparent;
        }

        .transport-option:hover {
          background: #e8ebe2;
          border-color: #8b9f4d;
        }

        .transport-option input[type="radio"] {
          margin-right: 12px;
          cursor: pointer;
          accent-color: #8b9f4d;
        }

        .transport-option span {
          font-size: 14px;
          font-weight: 500;
          color: #2d3a1f;
        }

        .modal-buttons {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
        }

        .btn-cancel,
        .btn-save {
          padding: 10px 16px;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-cancel {
          background: #e0e0e0;
          color: #333;
        }

        .btn-cancel:hover {
          background: #d0d0d0;
        }

        .btn-save {
          background: #8b9f4d;
          color: white;
        }

        .btn-save:hover:not(:disabled) {
          background: #7a8d42;
          transform: translateY(-2px);
        }

        .btn-save:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .reactflow-wrapper {
          height: 100%;
        }

        .react-flow__background {
          background: linear-gradient(135deg, #f5f7f0 0%, #e8ebe2 100%);
        }

        .react-flow__edge {
          stroke: #8b9f4d !important;
          stroke-width: 3;
        }

        .react-flow__edge.selected {
          stroke: #d4495e !important;
        }

        .react-flow__handle {
          background: #8b9f4d !important;
          border: 3px solid white !important;
        }

        .react-flow__controls {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
          border: none;
        }

        .react-flow__controls button {
          background: white;
          border: none;
          color: #8b9f4d;
          cursor: pointer;
          transition: all 0.2s;
        }

        .react-flow__controls button:hover {
          background: #f5f7f0;
          color: #7a8d42;
        }

        .react-flow__controls button svg {
          fill: currentColor;
        }
      `}</style>

      <div className="header">
        <h1>🌱 Avfallsverdikjede-editor</h1>
        <p>Definer транспортflyt for ditt avfallssystem</p>
      </div>

      <div className="flow-wrapper">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onEdgeClick={handleEdgeClick}
          nodeTypes={{
            default: (props) => (
              <WasteNode {...props} />
            ),
          }}
          edgeTypes={{
            default: (props) => (
              <div className="edge-label" onClick={(e) => handleEdgeClick(e, props.data)}>
                {props.data?.label || '?'}
              </div>
            ),
          }}
          fitView
        >
          <Background color="#aaa" gap={16} size={0.5} />
          <Controls />
        </ReactFlow>

        <div className="controls-panel">
          <button className="btn btn-add" onClick={addNode}>
            + Legg til stasjon
          </button>
        </div>
      </div>

      {selectedEdge && (
        <TransportModal
          edge={selectedEdge}
          onClose={() => setSelectedEdge(null)}
          onSave={handleTransportSave}
        />
      )}
    </div>
  );
}