import React, { useEffect, useRef,  } from "react";
import * as d3 from "d3";
import { Typography, Paper } from "@mui/material";
// import styles from '../Timeline.module.css';


const Timeline = () => {
  const ref = useRef();
  const a = useRef(false);


  // useEffect(()=>{
  //   if(a.current){
  //     return
  //   }
  //   a.current=true
  //   console.log('ABC ====');
    
  // },[])

  useEffect(() => {
    if(a.current){
      return
    }
    a.current=true

    const data = [
      { id: 1, event: "Article 370", date: "2021-10-15", impact: "Party A gained support", image: "../images/article-370.jpeg", summary: "The abrogation of Article 370, revoked Jammu & Kashmir's special status, integrating it fully into India and reorganizing it into two Union Territories: Jammu & Kashmir and Ladakh. This move, led by the BJP government, was framed as a step toward national integration, security, and development. It significantly influenced Indian elections by bolstering the BJP’s nationalist image and solidifying its voter base, especially in regions favoring a strong central government. While it polarized opinions, with supporters hailing it as a historic and patriotic decision and critics questioning its democratic and constitutional implications, the abrogation became a defining campaign issue for the BJP, showcasing decisive governance and fulfilling a core ideological promise." },
      { id: 2, event: "CAA Protests", date: "2022-02-20", impact: "Party B's popularity rose", image: "/images/CAA.png", summary: "The Citizenship Amendment Act (CAA), aimed to fast-track citizenship for non-Muslim refugees, sparking nationwide protests due to concerns over its potential to marginalize Muslims when coupled with a proposed National Register of Citizens (NRC). Critics viewed it as discriminatory and a threat to India’s secular fabric, while the BJP defended it as a humanitarian measure to protect persecuted minorities. The protests, which saw significant participation from students, women, and civil society, highlighted a polarization in Indian society. Politically, BJP leveraged the act to solidify its Hindu nationalist base, while opposition parties used the unrest to question the government’s commitment to constitutional values, thus favoring the opposition in their election campaigns." },
      { id: 3, event: "Agnipath Scheme", date: "2022-06-05", impact: "Support for Party D increased", image: "/images/agnipath.png", summary: "The Agnipath Scheme, launched by the Indian government, introduced a short-term contractual recruitment model for soldiers in the armed forces, termed Agniveers. Under the scheme, recruits serve for four years, with only a quarter retained for long-term service. Aimed at reducing the military’s pension burden and modernizing the forces with younger personnel, the scheme sparked widespread protests from aspirants and veterans concerned about job security and career prospects after service. Politically, while the government framed it as a reform to enhance efficiency and youth empowerment, opposition parties criticized it as undermining the dignity and stability of military careers. The scheme inclined to BJP's Favor, and thereby solidifying their hold on voters." },
      { id: 4, event: "Farmer Laws", date: "2022-10-10", impact: "Negative for Party C", image: "/images/farmer-laws.jpg", summary: "The repeal of the three contentious farm laws marked the culmination of year-long protests by farmers, primarily from Punjab, Haryana, and Uttar Pradesh. The laws, aimed at reforming agricultural markets by allowing private players greater access, were criticized by farmers as a threat to the Minimum Support Price (MSP) system and traditional mandi structures. The protests galvanized nationwide support, drawing attention to rural distress and farmer rights. Politically, the repeal was seen as a major setback for the BJP, as it sought to mitigate damage in upcoming elections in agrarian states. While the government maintained that the reforms were beneficial, the rollback underscored the power of mass mobilization in shaping policy decisions which inturn helped the opposition party." },
      { id: 5, event: "Chandrayaan-3", date: "2023-03-18", impact: "Party G solidified base", image: "/images/chandrayaan.png", summary: "India’s Chandrayaan-3 mission, successfully landing on the Moon's south pole, marked a historic milestone, making India the first country to achieve this feat and the fourth overall to conduct a successful lunar landing. The mission showcased the Indian Space Research Organisation’s (ISRO) prowess in cost-effective space exploration and was celebrated globally for advancing scientific knowledge about the lunar surface. Domestically, the achievement became a symbol of national pride and technological progress, with political leaders hailing it as a testament to India’s growing stature in space research. The success also defined ruling party's initiatives in advancing the Spaace research program and development of the country." },
      { id: 6, event: "Bharat Jodo", date: "2023-07-12", impact: "Shift in voter sentiment", image: "/images/india-alliance.png", summary: "The Bharat Jodo Yatra, launched by the Indian National Congress, was a nationwide foot march led by Rahul Gandhi, spanning over 4,000 kilometers from Kanyakumari to Kashmir. The campaign aimed to counter rising communal polarization, economic inequalities, and alleged authoritarianism under the BJP government, promoting messages of unity, secularism, and inclusivity. The yatra garnered widespread attention for its grassroots engagement, drawing participation from diverse sections of society, including farmers, laborers, and youth. Politically, it rejuvenated the Congress's image, uniting members of other party and thereby energizing its cadre and consolidating its support base ahead of key state elections." },
      { id: 7, event: "Ayodhya Temple", date: "2023-11-01", impact: "Damaged reputation of Party I", image: "/images/ayodhya.png", summary: "The Ayodhya Ram Mandir, a temple dedicated to Lord Ram at the disputed site in Ayodhya, Uttar Pradesh, is a culmination of decades of political, legal, and religious conflict in India. The Supreme Court ruled in favor of constructing the temple at the site where the Babri Masjid stood before its demolition in 1992, a landmark verdict that resolved one of India’s most contentious disputes. The construction of the temple, spearheaded by the BJP and Hindu organizations, became a symbol of cultural and religious revival for many Hindus. Politically, the Ram Mandir issue has been pivotal in the BJP's rise, resonating with its core Hindutva ideology and significantly shaping election narratives and gaining people's favor." },
      { id: 8, event: "Adani Heidenberg", date: "2024-01-10", impact: "Boost for Party H", image: "/images/adani.jpg", summary: "The Adani-Hindenburg crisis refers to the financial turmoil triggered by the report from Hindenburg Research, a US-based firm, accusing the Adani Group of stock manipulation and over-leveraging. The report led to a dramatic fall in the market value of Adani Group companies, wiping out billions of dollars from the conglomerate’s market capitalization. The allegations raised concerns about corporate governance and transparency in one of India’s largest business empires, which has close ties to the ruling BJP government. The Adani Group denied the allegations, describing the report as a smear campaign. The incident had widespread repercussions, affecting investor sentiment and raising broader questions about regulatory oversight in India, thus people doubting their trust in BJP." },
      { id: 9, event: "Intense Campaign", date: "2024-02-15", impact: "Swing in undecided voters", image: "/images/intense-campaign.jpeg", summary: "Intense campaigning refers to a high-energy, focused effort by political parties or candidates to engage with voters and gain support during an election period. It involves a range of strategies, including rallies, speeches, door-to-door canvassing, social media outreach, advertisements, and debates. The goal is to mobilize voters, address key issues, and promote the candidate’s or party’s policies. Intense campaigning often escalates in the final stages of an election, with parties attempting to sway undecided voters and increase turnout, especially in competitive constituencies. BJP implemented various strategies during these campaigning just to regain the voter's trust and confidence." },
      { id: 10, event: "Manipur Clashes", date: "2024-04-20", impact: "Party F gained momentum", image: "/images/manipur-clashes.png", summary: "The Manipur ethnic clashes, stemmed from longstanding tensions between the Meitei and Kuki communities over land rights, tribal status, and political representation. The violence, triggered by protests against granting Scheduled Tribe status to the Meiteis, led to widespread displacement, loss of lives, and destruction of property, severely impacting the state's socio-political fabric. Politically, the unrest exposed governance challenges and fueled criticism of the BJP-led state and central governments for delayed intervention and perceived bias. The clashes deepened ethnic divisions, influenced political alignments, and became a contentious issue thus tarnishing BJP's image in North-Eastern states of India." }
  ];
  
  const width =960
  const height=520
  console.log(width, height,'=======')
  const cardColors = ["orange", "lightblue"];

  const svg = d3.select("#timeline")
    .attr("viewBox", `0 0 ${width * 2} ${height}`);

    const defs = svg.append("defs");

defs.append("pattern")
    .attr("id", "bg-image")
    .attr("patternUnits", "userSpaceOnUse")
    .attr("width", width * 4 )
    .attr("height", height)
    .append("image")
    .attr("href", "/images/image.png")
    
    .attr("x", -width + 1150) // Shift the image to the left
    .attr("y", -height / 4 +120);

    svg.insert("rect", ":first-child")
    .attr("width", width * 4)
    .attr("height", height + 100)
    
    // .attr("fill", "rgba(230, 230, 250, 0.5)")
    .attr("fill", "url(#bg-image)")
    .attr("x", -width);
      // Shift the rectangle to the left

const timelineY = height / 2;

const timelineLine = svg.append("line")
    
    .attr("y1", timelineY)
    .attr("y2", timelineY)
    .attr("stroke", "black")
    .attr("stroke-width", 2);


const circleRadius = 8;
const cardWidth = 170;
const cardHeight = 140;
const gap = width / 4;
const initialOffset = cardWidth / 2 + 280;

const timelineGroup = svg.append("g")
    .attr("transform", `translate(${initialOffset + 80}, 0)`);

let offset = 0;
let animationPaused = false;

const detailBox = svg.append("g")
    .attr("class", "detail-box")
    .style("opacity", 0)
    .attr("pointer-events", "none");

const margin = 20;
const detailBoxWidth = width + 10 * margin;
console.log(margin)



detailBox.append("rect")
    .attr("x", margin + 350)
    .attr("y", margin + 50)
    .attr("width", detailBoxWidth)
    .attr("height", height / 2 + 70)
    // .attr("fill", "#f5f5f5")
    // .attr("fill", "rgba(255, 255, 255, 1)") // Semi-transparent white background
    .attr("stroke", "black")
    .attr("stroke-width", 2)
    .attr("rx", 30)  // Add this line for rounded corners
    .attr("ry", 30);

// Add the new rectangle block for the title
detailBox.append("rect")
    .attr("x", margin + 350)
    .attr("y", margin + 50)
    .attr("width", detailBoxWidth)
    .attr("height", 50)
    .attr("fill", "lightgreen")
    .attr("stroke", "black")
    .attr("stroke-width", 2)
    .attr("rx", 20)  // Add this line for rounded corners
    .attr("ry", 20);

const detailContent = detailBox.append("g")
    .attr("transform", `translate(${margin + 280}, ${margin + 70})`);

    detailContent.append("rect")
    .attr("class", "image-box")
    .attr("x", 100.5)
    .attr("y", 66.5)
    .attr("width", 400)
    .attr("height", 198)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 3)
    // .attr("rx", 30)  // Add this line for rounded corners
    // .attr("ry", 30);

    detailContent.append("text")
    .attr("class", "detail-title")
    .attr("x", detailBoxWidth / 2 + 80)
    .attr("y", 12)
    .attr("text-anchor", "middle")
    .style("font-size", "24px")
    .style("font-weight", "bold");


detailContent.append("image")
    .attr("class", "detail-image")
    .attr("x", 102)
    .attr("y", 68)
    .attr("width", 340)
    .attr("height", 550)
    .attr("preserveAspectRatio", "xMidYMid slice")
    .attr("rx", 30)  // Add this line for rounded corners
    .attr("ry", 30);
    

detailContent.append("text")
    .attr("class", "detail-summary")
    .attr("x", 537)
    .attr("y", 78)
    .attr("width", width - 2 * margin - 240)
    .style("font-size", "18px")
    .style("font-weight", "bold");

const closeButton = detailBox.append("g")
    .attr("class", "close-button")
    .attr("transform", `translate(${width + 540}, ${margin + 74})`)
    .style("cursor", "pointer");

closeButton.append("circle")
    .attr("r", 17)
    .attr("fill", "#f0f0f0");

closeButton.append("text")
    .attr("text-anchor", "middle")
    .attr("dy", "0.35em")
    .text("×")
    .style("font-size", "20px");

closeButton.on("click", () => {
    detailBox.transition().duration(300).style("opacity", 0);
    detailBox.attr("pointer-events", "none");
    animationPaused = false;
    requestAnimationFrame(scrollTimeline);
  });


  data.forEach((d, i) => {
    const x = i * gap + 20;
    const isAbove = i % 2 === 0;

    const circle = timelineGroup.append("circle")
        .attr("fill", "black")
        .attr("cx", x)
        .attr("cy", timelineY)
        .attr("r", circleRadius);

    const dateBox = timelineGroup.append("g")
        .attr("class", "date-box")
        .attr("transform", `translate(${x}, ${timelineY - 40})`)
        .style("opacity", 0);

    dateBox.append("rect")
        .attr("width", 140)
        .attr("height", 30)
        .attr("fill", "#f0f0f0")
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("rx", 5)
        .attr("ry", 5);

    const date = new Date(d.date);
    const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });

    dateBox.append("text")
        .attr("x", 70)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .attr("fill", "purple")
        .style("font-weight", "bold")
        .text(monthYear);

    circle.on("mouseover", function() {
        animationPaused = true;
        d3.select(this).attr("r", circleRadius * 1.5);
        dateBox.transition().duration(200).style("opacity", 1);
    })
    .on("mouseout", function() {
        animationPaused = false;
        d3.select(this).attr("r", circleRadius);
        dateBox.transition().duration(200).style("opacity", 0);
        requestAnimationFrame(scrollTimeline);
    });

    const cardY = isAbove ? timelineY - 45 : timelineY + 45;
    timelineGroup.append("line")
    .attr("stroke", "#000")        // Line color (black)
    .attr("stroke-width", 2)
        .attr("x1", x)
        .attr("x2", x)
        .attr("y1", timelineY)
        .attr("y2", cardY);

        const card = timelineGroup.append("g")
        .attr("class", "card")
  //       .attr("fill", "#f0f0f0")     // Fill color
  // .attr("stroke-width", 1)     // Stroke width
  // .attr("cursor", "pointer")   // Cursor on hover
  
        .attr("transform", `translate(${x - cardWidth / 2}, ${isAbove ? cardY - cardHeight : cardY})`);
    
        const cardColor = i % 2 === 0 ? "rgba(255, 165, 0, 0.9)" : "rgba(173, 216, 230, 0.9)";

    card.append("rect")
        .attr("width", cardWidth)
        .attr("height", cardHeight)
        .attr("fill", cardColor)
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("rx", 20)
        .attr("ry", 20);
    
        const clipPath = defs.append("clipPath")
        .attr("id", `clip-${i}`);
    
    clipPath.append("rect")
        .attr("width", 290)
        .attr("height", 260)
        .attr("rx", 20)
        .attr("ry", 20);
    
        const imageGroup = card.append("g")
        .attr("clip-path", `url(#clip-${i})`);
    
    imageGroup.append("image")
        .attr("href", d.image)
        .attr("x", 14)
        .attr("y", 13)
        .attr("width", 141)
        .attr("height", 65)
        .attr("preserveAspectRatio", "xMidYMid slice");
    
        imageGroup.append("rect")
        .attr("x", 13)
        .attr("y", 12)
        .attr("width", 143)
        .attr("height", 67)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("rx", 10)  // Add this line for rounded corners
    .attr("ry", 10);

        card.append("text")
          // Set font size
        .attr("pointer-events", "none")
        .attr("x", cardWidth / 2)
        .attr("y", 111)
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .style("font-size", "17px")
        .attr("font-weight", "bold")  // Add this line to make the text bold
        .text(d.event);

    card.on("click", function(event) {
        animationPaused = true;
        detailBox.attr("pointer-events", "all");
        detailBox.transition().duration(300).style("opacity", 1);
        
        detailContent.select(".detail-title").text(d.event);
        detailContent.select(".detail-date").text(new Date(d.date).toLocaleDateString());
        detailContent.select(".detail-impact").text(`Impact: ${d.impact}`);
        detailContent.select(".detail-image").attr("href", d.image);
        detailContent.select(".detail-summary").text(d.summary);
        const summaryText = detailContent.select(".detail-summary");
    summaryText.text("");
    wrapText(summaryText, d.summary, width - 2 * margin - 260);

        detailContent.select(".image-box")
        .attr("width", 398)
        .attr("height", 199);
    detailContent.select(".detail-image")
        .attr("href", d.image)
        .attr("width", 395)
        .attr("height", 196);

        detailBox.select("rect").attr("fill", cardColor);
    })
    .on("mouseover", function() {
        animationPaused = true;
        d3.select(this).select("rect")
            .style("fill", d3.color(cardColor).darker(0.1))
            .style("stroke", "yellow")
            .style("stroke-width", 3)
            .style("opacity", 1);
    })
    .on("mouseout", function() {
        if (detailBox.style("opacity") !== "1") {
            animationPaused = false;
            requestAnimationFrame(scrollTimeline);
        }
        d3.select(this).select("rect")
            .style("fill", cardColor)
            .style("stroke", "black")
            .style("stroke-width", 2)
            .style("opacity", 1);
    });
    updateTimelineLine();
});



let direction = -1; // -1 for left, 1 for right
let animationFrameId = null;

function scrollTimeline() {
  if (!animationPaused) {
      offset += (gap/120) * direction;
      if (Math.abs(offset) > gap * (data.length - 5) + initialOffset || offset > 0) {
          direction *= -1; // Reverse direction
      }
      timelineGroup.attr("transform", `translate(${initialOffset + offset + 20}, 0)`);
      updateTimelineLine(); // Add this line to update the timeline
      requestAnimationFrame(scrollTimeline);
  }
}


requestAnimationFrame(scrollTimeline);

function updateTimelineLine() {
    const firstCard = timelineGroup.select(".card").node();
    const lastCard = timelineGroup.select(".card:last-child").node();
    if (firstCard && lastCard) {
        const firstCardX = firstCard.getBoundingClientRect().left - svg.node().getBoundingClientRect().left;
        const lastCardX = lastCard.getBoundingClientRect().right - svg.node().getBoundingClientRect().left;
        timelineLine.attr("x1", firstCardX + 95)
                    .attr("x2", lastCardX - 10);
    }
}

function wrapText(text, str, width) {
    const words = str.split(/\s+/).reverse();
    let word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1,
        x = text.attr("x"),
        y = text.attr("y"),
        dy = 0;
    
    let tspan = text.append("tspan")
        .attr("x", x)
        .attr("y", y)
        .attr("dy", dy + "em");
    
    while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan")
                .attr("x", x)
                .attr("y", y)
                .attr("dy", ++lineNumber * lineHeight + dy + "em")
                .text(word);
        }
    }
}



  }, []);

// return (
//   <p>sdfsd</p>
// )  
return (
    <Paper elevation={3} sx={{ padding: 8 }}>
      {/* <Typography variant="h5" gutterBottom>
        Timeline of Key Events - Lok Sabha 2024
      </Typography>
      <Typography>
        Explore the sequence of significant events that influenced the election outcome.
      </Typography> */}
      
      <svg  id = "timeline"></svg>
      
    </Paper>
  );
};

export default Timeline;