import type { NextPage } from 'next';
import React from 'react';

type AgentDetailsProps = { agentDetails: AgentDetails };

const AgentDetailsViewer: NextPage<AgentDetailsProps> = ({ agentDetails }) => {
  function buildTable() {
    const tableRows: React.JSX.Element[] = [];
    const retitledDetails = {
      id: agentDetails.accountId,
      symbol: agentDetails.symbol,
      hq: agentDetails.headquarters,
      credits: agentDetails.credits,
      faction: agentDetails.startingFaction,
    };

    Object.entries(retitledDetails).forEach(([key, value]) => {
      const index1 = Math.floor(Math.random() * 10 + 1);
      const index2 = Math.floor(Math.random() * 10 + 1);
      console.log('index1, index2 :>> ', index1, index2);
      tableRows.push(
        <tr key={`${key}${value}`}>
          <td className={`flicker${index1} border-r-2 border-gray-800 pr-3`}>
            {key}
          </td>
          <td className={`flicker${index2} pl-3`}>{value}</td>
        </tr>
      );
    });

    return tableRows;
  }

  return (
    <div className="flex-column flex">
      <div className="background2">
        <table className="m-3 table-auto">
          <tbody>{buildTable()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default AgentDetailsViewer;
