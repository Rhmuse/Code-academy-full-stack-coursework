// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Returns a pAequor object
const pAequorFactory = (n, a) => {
  return {
    specimenNum: n,
    dna: a,
    mutate() {
      let newBase = returnRandBase();
      if (newBase === this.dna[0]) {
        while (newBase === this.dna[0]) {
          newBase = returnRandBase();
        }
        return this.dna[0] = newBase;
      } else if(newBase !== this.dna[0]) {
         return this.dna[0] = newBase;
      }  else {
        console.log('Error in mutate.()')
      }  
    },
    compareDNA(passedDna) {
      let sharedDna = 0;
      for (let i = 0; i < this.dna.length - 1; i++) {
        if (this.dna[i] === passedDna.dna[i]) {
          sharedDna++;
        }
      };
      let percentSharedDna = Math.round((sharedDna / (this.dna.length) ) * 100);
      console.log(`Specimen #1 and specimen #2 have ${percentSharedDna}% DNA in common.`);
    },
    willLikelySurvive() {
      const getOccurrence = (array, value) => {
        var count = 0;
        array.forEach((v) => (v === value && count++));
        return count;
      };
      const numberOfCAndG = getOccurrence(this.dna, 'C') + getOccurrence(this.dna, 'G');
      const cGOccurnece = Math.round(((numberOfCAndG) / (this.dna.length) ) * 100);
      console.log(cGOccurnece);
      return cGOccurnece > 60;  
    }
  }
};

// Returns an array with a length of 30 containing DNA base strands that are all likely to survive. 
const makeViablePAequorArr = () => {
  let i = 1;
  const res = [];
  while (i < 31) {
    let workingStrand = pAequorFactory(i, mockUpStrand);
    if (workingStrand.willLikelySurvive) {
      res.push(workingStrand);
      i++
    }
  }
  return res;
};

// Test Code
viablePAequorArr = makeViablePAequorArr();
console.log(viablePAequorArr.length === 30);



