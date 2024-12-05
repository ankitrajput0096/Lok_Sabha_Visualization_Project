import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Typography, Select, MenuItem, Paper, Box } from '@mui/material';

const REGION_INFO = {
  'The Northern States': `In the 2024 Lok Sabha elections, northern states exhibited a diverse range of political outcomes. 
          Uttar Pradesh, with its 80 constituencies, remained a stronghold for the BJP, although the party faced increased competition from the Samajwadi Party (SP) and Indian National Congress (INC). 
          The BJP's performance was notably challenged in areas with significant caste-based voter groups, highlighting the changing political dynamics in the state. Voter concerns related to economic conditions, law and order, and unemployment played a significant role in shaping outcomes.
          In Haryana, the BJP managed to retain control over a majority of seats, but it witnessed a surge in opposition sentiment, with the Indian National Congress and Jannayak Janata Party (JJP) making notable strides. The state's political environment, influenced by farmer protests and local governance issues, led to more unpredictable voting patterns. Punjab saw an exciting development with the Aam Aadmi Party (AAP) and Congress gaining ground. `,
          
  'The Western States': `In the 2024 Lok Sabha elections, the Western states of India saw significant shifts, with key victories and notable losses across major parties.
          In Maharashtra, the Bharatiya Janata Party (BJP) managed to retain important seats, despite challenges from regional players. The Shiv Sena (Uddhav faction) had a particularly tight race, winning Mumbai North West by a razor-thin margin of just 48 votes, marking one of the closest contests of the election. 
          In Gujarat, the BJP continued its dominance, maintaining most of its seats. However, the opposition made some inroads, particularly in regions traditionally held by the BJP. Similarly, Rajasthan witnessed fierce competition, with the Congress gaining a strong foothold in several constituencies.
          Overall, while the BJP retained a substantial presence in Western India, the opposition, particularly from the Congress and regional parties, managed to cut into their margin, indicating a more competitive electoral landscape in these states.`,

  'The Southern States': `In the 2024 Lok Sabha elections, the Southern states saw mixed results, with regional parties maintaining dominance in some areas, while national parties faced challenges.
            In Tamil Nadu, the Indian National Developmental Inclusive Alliance (INDIA) coalition, led by the Dravida Munnetra Kazhagam (DMK), swept the state, securing all 39 seats. The BJP's attempts to expand its influence were unsuccessful.
            In Karnataka, the Congress performed strongly, securing significant victories, while the BJP’s influence diminished. 
            In Andhra Pradesh, YSR Congress Party retained its grip, securing a majority of seats, while the BJP faced challenges despite efforts to gain a foothold. 
            In Kerala, the Left Democratic Front (LDF), led by the Communist Party of India (Marxist), fared well, while the BJP struggled to make significant inroads.
            Overall, Southern India maintained its regional stronghold, with the BJP struggling in several states despite its efforts to expand its presence.`,

  'The Eastern States': `In the 2024 Lok Sabha elections, the results in Eastern India showed significant shifts in political dynamics. Key states in this region include Bihar, West Bengal, Odisha, and Jharkhand.
          In Bihar, the National Democratic Alliance (NDA), led by the BJP, faced strong competition from the INDIA coalition, which included regional players like the RJD (Rashtriya Janata Dal). 
          In West Bengal, Chief Minister Mamata Banerjee's Trinamool Congress (TMC) remained dominant, winning the majority of seats in the state. The TMC’s stronghold in Bengal was largely intact, with the BJP failing to make significant inroads compared to previous elections.
          In Odisha, the Biju Janata Dal (BJD), maintained its grip on the state's politics, securing a large share of the seats. The BJD’s regional influence was unchallenged, despite the national contest involving the BJP and Congress.
          Overall, Eastern India in 2024 saw a mix of regional dominance and intense competition from the national parties, with regional parties like the TMC, BJD, and JMM playing pivotal roles in their respective states, alongside the increasing influence of the INDIA alliance.`,

  'The Northeastern States': `The results of the 2024 Lok Sabha elections in the North-Eastern states reveal both gains and setbacks for the BJP-led NDA coalition. The BJP maintained strongholds in Arunachal Pradesh and Tripura. However, the region saw significant losses, particularly in states where Christian voters are influential, such as Manipur, Meghalaya, and Nagaland. In Manipur, both seats were lost to Congress, with the Meitei community expressing dissatisfaction with the BJP's handling of the state's violence.
                In Meghalaya, the ruling NPP's positions in both Tura and Shillong were overturned, with Congress and regional party VPP making notable gains. Nagaland also saw the NDA's candidate lose the sole seat to Congress. Meanwhile, Assam witnessed the BJP retaining its strong presence with 9 out of 11 seats, despite competition from Congress, which secured notable wins in minority-dominated constituencies like Dhubri and Karimganj.
                Overall, the NDA secured 16 seats, while Congress made inroads with 7, and regional parties such as VPP and ZPM won in Meghalaya and Mizoram.`,

  'India': `The 2024 Lok Sabha Elections marked a defining moment in India's democratic journey, showcasing the resilience and vibrancy of the world's largest democracy. Held in a phased manner across the country, the elections saw an unprecedented voter turnout, reflecting the growing engagement of the Indian electorate. This election was pivotal in shaping the 18th Lok Sabha, with major political players like the Bharatiya Janata Party (BJP), Indian National Congress (INC), and a coalition of several regional parties. Key campaign themes included economic growth, unemployment, social justice, climate change, and India's global standing. Digital technologies and social media played a transformative role in reaching voters, especially the youth and first-time voters.
            The 2024 elections were also notable for their emphasis on inclusivity and transparency, with the Election Commission of India introducing various measures to facilitate accessible and secure voting. Electronic Voting Machines (EVMs) with Voter-Verifiable Paper Audit Trails (VVPATs) were extensively used, ensuring the integrity of the process. As a historical milestone, the 2024 Lok Sabha elections reaffirmed India's commitment to its democratic ethos, setting the stage for the nation's socio-political and economic trajectory in the years to come.`
};

const PieChart = () => {
  const ref = useRef();
  const [stateData, setStateData] = useState('India');
  const [stateWiseData, setStateWiseData] = useState({});
  const [stateInfo, setStateInfo] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const fileName = './LS_2024.csv';
      try {
        const data = await d3.csv(fileName);
        const cleanData = [];
        data.forEach((d) => {
          let state = d.STATE;
          let party = d.PARTY;
          let votes = +d.TOTALVOTES;
          let winner = +d.WINNER;
          cleanData.push({ state, party, votes, winner });
        });

        const stateToRegionMap = {
          'Andaman & Nicobar Islands': 'The Eastern States',
          'Andhra Pradesh': 'The Southern States',
          'Arunachal Pradesh': 'The Northeastern States',
          'Assam': 'The Northeastern States',
          'Bihar': 'The Eastern States',
          'Chandigarh': 'The Northern States',
          'Chhattisgarh': 'The Northern States',
          'Dadra & Nagar Haveli': 'The Western States',
          'Daman & Diu': 'The Western States',
          'Goa': 'The Western States',
          'Gujarat': 'The Western States',
          'Haryana': 'The Northern States',
          'Himachal Pradesh': 'The Northern States',
          'Jammu & Kashmir': 'The Northern States',
          'Jharkhand': 'The Eastern States',
          'Karnataka': 'The Southern States',
          'Kerala': 'The Southern States',
          'Lakshadweep': 'The Southern States',
          'Madhya Pradesh': 'The Northern States',
          'Maharashtra': 'The Western States',
          'Manipur': 'The Northeastern States',
          'Meghalaya': 'The Northeastern States',
          'Mizoram': 'The Northeastern States',
          'Nagaland': 'The Northeastern States',
          'NCT of Delhi': 'The Northern States',
          'Odisha': 'The Eastern States',
          'Puducherry': 'The Southern States',
          'Punjab': 'The Northern States',
          'Rajasthan': 'The Western States',
          'Sikkim': 'The Eastern States',
          'Tamil Nadu': 'The Southern States',
          'Telangana': 'The Southern States',
          'Tripura': 'The Northeastern States',
          'Uttar Pradesh': 'The Northern States',
          'Uttarakhand': 'The Northern States',
          'West Bengal': 'The Eastern States',
          'Ladakh': 'The Northern States',
          'India': 'India',
        };

        let aggregatedData = cleanData.reduce((acc, datapt) => {
          const region = stateToRegionMap[datapt.state.trim()] || 'unknown';
          if(region === 'unknown') return acc;
          const key = `${region}-${datapt.party}`;
          if (!acc[key]) {
            acc[key] = {
              region: region,
              party: datapt.party,
              votes: 0,
              winner: datapt.winner
            };
          }
          acc[key].votes += datapt.votes;
          return acc;
        }, {});

        const stateWiseData = Object.values(aggregatedData).reduce((acc, datapt) => {
          if (!acc[datapt.region]) {
            acc[datapt.region] = [];
          }
          acc[datapt.region].push({
            party: datapt.party,
            votes: datapt.votes,
            winner: datapt.winner
          });
          return acc;
        }, {});

        stateWiseData['India'] = cleanData.reduce((acc, datapt) => {
          const { party, votes } = datapt;
          const existing = acc.find((entry) => entry.party === party);
          if (existing) {
            existing.votes += votes;
          } else {
            acc.push({ party, votes });
          }
          return acc;
        }, []);

        setStateWiseData(stateWiseData);
      } catch (error) {
        console.error('Error processing CSV data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!stateWiseData[stateData]) return;

    const svg = d3.select(ref.current).attr('width', 1000).attr('height', 510);

    const renderPie = (data) => {
      svg.selectAll('*').remove();

      const radius = 200;
      const color = d3.scaleOrdinal(
        [...d3.schemeCategory10, ...d3.schemeTableau10, ...d3.schemeSet2, ...d3.schemeSet3, ...d3.schemePastel1, ...d3.schemePastel2]
          .flat()
          .slice(0, 100)
      );
      color.domain(data.map((d) => d.party));

      const pie = d3.pie().value((d) => d.votes);
      const pieData = pie(data);
      const arc = d3.arc().innerRadius(0).outerRadius(radius);
      const arcHover = d3.arc().innerRadius(0).outerRadius(radius + 10);

      const tooltip = d3
        .select('body')
        .append('div')
        .style('position', 'absolute')
        .style('background', 'white')
        .style('border', '1px solid #ccc')
        .style('padding', '5px')
        .style('border-radius', '5px')
        .style('display', 'none');

      const chartGroup = svg
        .append('g')
        .attr('transform', 'translate(250,250)');

      chartGroup
        .selectAll('path')
        .data(pieData)
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', (d, i) => color(i))
        .style('cursor', 'pointer')
        .on('mouseover', function (event, d) {
          d3.select(this).transition().duration(200).attr('d', arcHover);
          tooltip
            .style('display', 'block')
            .html(`<strong>${d.data.party}</strong><br>Votes: ${d.data.votes}`);
        })
        .on('mousemove', (event) => {
          tooltip
            .style('left', `${event.pageX + 10}px`)
            .style('top', `${event.pageY - 20}px`);
        })
        .on('mouseout', function () {
          d3.select(this).transition().duration(200).attr('d', arc);
          tooltip.style('display', 'none');
        });

      const topNData = pieData
        .slice()
        .sort((a, b) => b.data.votes - a.data.votes)
        .slice(0, 75);
      
      const legend = svg.append('g').attr('transform', 'translate(500, 50)');

      legend
        .selectAll('rect')
        .data(topNData)
        .enter()
        .append('rect')
        .attr('x', (d, i) => Math.floor(i / 20) * 100)
        .attr('y', (d, i) => (i % 20) * 20)
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', (d, i) => color(i));

      legend
        .selectAll('text')
        .data(topNData)
        .enter()
        .append('text')
        .attr('x', (d, i) => Math.floor(i / 20) * 100 + 20)
        .attr('y', (d, i) => (i % 20) * 20 + 12)
        .text((d) => d.data.party)
        .style('font-size', '12px')
        .style('fill', '#333');


      setStateInfo(REGION_INFO[stateData]);
    };

    renderPie(stateWiseData[stateData]);
  }, [stateData, stateWiseData]);

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant='h5' gutterBottom>
        Voter Share Analysis - Lok Sabha 2024
      </Typography>
      <Typography>
        Select a region to view the distribution of votes among major political parties.
      </Typography>
      <Box sx={{ marginBottom: 2 }}>
        <Select
          value={stateData}
          onChange={(e) => setStateData(e.target.value)}
        >
          {Object.keys(stateWiseData || {}).map((state) => (
            <MenuItem key={state} value={state}>
              {state}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
        <svg ref={ref} style={{ width: '70%' }}></svg>
        <Box sx={{ width: '40%', paddingTop: '20px', paddingRight: '10px' }}>
          <Typography variant='h6' sx={{ fontSize: '0.9rem', textAlign: 'left' }}>
            {stateInfo}
          </Typography>
        </Box>
      </Box>

    </Paper>
  );
};

export default PieChart;

