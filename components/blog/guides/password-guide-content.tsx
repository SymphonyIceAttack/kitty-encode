"use client";

import { motion } from "framer-motion";
import { ArticleHeader } from "@/components/blog/article-header";
import { StreamdownRenderer } from "@/components/blog/streamdown";
import { StreamdownTOC } from "@/components/blog/streamdown-toc";
import { PasswordGuideStructuredData } from "@/components/structured-data/blog-post";
import { extractTOCFromText, shouldShowTOC } from "@/lib/toc";

// Article metadata
const articleData = {
  title: "Password Security: Information Theory and Key Derivation",
  description:
    "A rigorous information-theoretic analysis of password security, examining entropy thresholds, the failure of complexity rules (NIST SP 800-63B), and the memory-hardness properties of the Argon2 KDF.",
  author: "Security Research",
  date: "2024-12-21",
  readTime: "25 min",
  tags: ["Cryptography", "Argon2", "Information Theory", "NIST"],
  image: "/password-guide-pixel.jpeg",
  featured: false,
};

export function PasswordGuideContent() {
  const content = `# Password Security: Information Theory and Key Derivation

> **Abstract**: This comprehensive analysis examines password security through the lens of information theory and computational cryptography. We establish rigorous mathematical bounds on entropy requirements, demonstrate why traditional complexity rules fundamentally fail against modern attack methodologies, and provide an in-depth technical evaluation of memory-hard key derivation functions. This report serves as both a theoretical foundation and practical implementation guide for engineering teams building modern authentication systems.

## 1. Foundations of Information-Theoretic Password Strength

### 1.1 Shannon Entropy and Its Misapplication

The mathematical foundation of password strength rests on Claude Shannon's information theory, originally developed for communication channels in 1948. When applied to human-generated secrets, entropy quantifies the expected number of random bits required to encode the password distribution.

The standard formula for password entropy is:

$$H = L · log_2(N)$$

Where:
- $H$ = Entropy in bits
- $L$ = Length of the password in characters
- $N$ = Size of the character repertoire (alphabet)

However, this formula assumes **uniform random selection** from the character space—a condition that human-chosen passwords systematically violate. The critical distinction lies between:

| Metric | Definition | Attack Relevance |
|--------|------------|------------------|
| **Theoretical Entropy** | $log_2(N^L)$ assuming uniform distribution | Lower bound for brute-force resistance |
| **Effective Entropy** | $log_2(\text{actual guess distribution})$ | True security against adaptive adversaries |

Human password selection follows predictable patterns influenced by linguistic structure, memory constraints, and cultural factors. Studies analyzing billion-entry password databases reveal that the effective entropy of human-chosen passwords is often **50-70% lower** than theoretical calculations suggest.

### 1.2 The Information-Theoretic Case for Length Over Complexity

For decades, regulatory frameworks mandated password complexity rules: mandatory uppercase, lowercase, digits, and symbols. This approach, codified in standards like PCI-DSS 3.2 and NIST SP 800-63 (pre-2017), rests on a critical misunderstanding of information density.

Consider the entropy contribution per character position:

- **Lowercase only** ($N=26$): $log_2(26) ≈ 4.7$ bits/char
- **Mixed case + digits** ($N=62$): $log_2(62) ≈ 5.95$ bits/char
- **Full ASCII printable** ($N=95$): $log_2(95) ≈ 6.57$ bits/char

The **incremental gain** from expanding the character set is approximately 1.8 bits per position at maximum—yet this comes at the cost of user behavior that systematically exploits these rules.

**Empirical Analysis**: The "Password1!" Pattern

A study of 34 million passwords revealed that 13.4% followed patterns where:
- The first character is uppercase (cultural convention)
- The final 1-2 characters are digits (often birth years or "1!")
- The "special character" is almost always "!" at the end

This creates a **constraint satisfaction problem** for attackers. Rather than searching $N^L$ possibilities, intelligent attacks reduce the search space by exploiting structural regularities. The effective entropy of "P@ssw0rd1!" is not 88 bits (the theoretical value for 8 characters from a 95-character set) but approximately **22 bits**—vulnerable to dictionary attacks in seconds.

### 1.3 Passphrases and Dictionary-Based Selection

The XKCD "Correct Horse Battery Staple" comic, while oversimplified, correctly identifies the fundamental trade-off: **entropy density** (bits per character) versus **selection uniformity**.

For dictionary-based passphrases:

- **Dictionary size** ($D$): Typically 2048-7776 words for curated lists, 20,000+ for expansive ones
- **Selection count** ($k$): Number of words chosen
- **Entropy**: $k · log_2(D)$

With $D = 2048$ and $k = 4$:
$$H = 4 · 11 = 44 \text{ bits}$$

However, this assumes **uniform random selection**, which real-world passphrase generation often violates. Users gravitate toward common words, memorable phrases, and syntactic patterns. The EFF's Dice-generated wordlists (7776 words) address this by encouraging physical randomization through dice rolls.

The **information-theoretic optimum** for human-memorable secrets combines:
1. High-entropy generation method (random selection from large space)
2. Length sufficient to resist offline attacks
3. Memorability through chunking and meaningful association

## 2. Cryptographic Primitives: The Evolution of Password Hashing

### 2.1 The Fundamental Distinction: Hash Functions vs. KDFs

Understanding password security requires distinguishing between cryptographic primitives designed for different purposes:

| Primitive | Design Goal | Attack Resistance | Use Case |
|-----------|-------------|-------------------|----------|
| **MD5/SHA-1/SHA-2** | Speed, collision resistance | Minimal against brute-force | Message authentication, integrity |
| **PBKDF2** | Derive keys from passwords | Moderate (CPU-only) | Key derivation (legacy) |
| **bcrypt** | Password storage | High (memory-hard) | Legacy Unix, some web apps |
| **scrypt** | Memory-hard KDF | Very High | Altcoins, high-security |
| **Argon2** | Memory-hard, side-channel resistant | Highest | Modern password storage |

The critical property for password storage is **asymmetric verification cost**: legitimate authentication requires single verification (milliseconds), while offline attacks on compromised hashes must perform billions of attempts to be effective.

### 2.2 The Cryptanalytic Advantage: GPU and ASIC Acceleration

Modern attacks leverage hardware parallelism that obsolete the security assumptions of early KDFs:

**SHA-256 Performance on Contemporary Hardware:**

| Hardware | Hashes/Second | Cost per 10^9 Hashes |
|----------|---------------|---------------------|
| High-end CPU (64 threads) | ~500 Mh/s | $0.01 (electricity only) |
| NVIDIA RTX 4090 | ~150 Gh/s | $0.0003 |
| Specialized ASIC (Antminer S19) | ~110 Th/s | $0.000001 |

This represents a **10^6 performance differential** between general-purpose and specialized hardware. A password that requires 1 year to crack on a CPU would fall in 30 seconds against an ASIC cluster.

The fundamental problem is that **SHA-256 and similar Merkle-Damgård constructions are optimized for exactly the operation that attackers want**: fast, parallel, memory-efficient computation.

### 2.3 PBKDF2: The CPU-Hardening Attempt

**Password-Based Key Derivation Function 2** (RFC 2898, 2000) introduced the concept of **iterations**—repeating the hash function to increase computational cost:

$$\text{PBKDF2}(P, S, c, dkLen) = \text{PRF}_P(S parallel \text{int_32}(i)) \text{ iterated } c \text{ times}$$

Where:
- $P$ = Password
- $S$ = Salt (unique per user)
- $c$ = Iteration count
- $dkLen$ = Derived key length
- $\text{PRF}$ = Pseudorandom function (typically HMAC-SHA256)

**Security Analysis:**

| Aspect | Assessment |
|--------|------------|
| **Advantage** | Simple, widely supported, NIST-standardized |
| **Limitation** | Memory usage is constant O(1), enabling parallel GPU attacks |
| **Recommended Iterations** | 600,000+ (NIST 2023) for HMAC-SHA256 |
| **Vulnerability** | FPGAs and ASICs implement PBKDF2 at near-optimal efficiency |

The **parallelism advantage** is devastating: a modern GPU with 16,000 cores can execute 16,000 independent PBKDF2 instances simultaneously, making high iteration counts insufficient for security.

### 2.4 bcrypt: Memory-Based Instruction Hardening

bcrypt (1999) introduced **memory hardness** through an adaptive Blowfish-based key schedule:

$$\text{bcrypt}(P, S, cost) = \text{Blowfish_ExpandKey}(P, S, \text{cost iterations})$$

**Technical Innovation:**

The Blowfish key schedule operates on a 4KB state (S-boxes) that is repeatedly modified. This creates:

1. **Memory footprint**: ~4KB working memory per hash
2. **Cache sensitivity**: Random memory access patterns that disrupt CPU pipelining
3. **Cost scaling**: Each increment of "cost" doubles the computation time

**Security Analysis:**

| Metric | Value | Notes |
|--------|-------|-------|
| Work factor range | 4-31 | $2^{\text{cost}}$ expansions |
| Memory per instance | 4 KB | Fixed, cannot be reduced |
| GPU resistance | Moderate | Memory bandwidth limits parallelism |
| FPGA resistance | Low | FPGA can implement S-boxes efficiently |

bcrypt's limitation is its **fixed memory requirement**. While 4KB disrupts GPU parallelism, modern FPGAs with on-chip block RAM can implement the S-boxes efficiently, recovering much of the parallelism advantage.

### 2.5 scrypt: The Memory-Hard Pioneer

Colin Percival's scrypt (2009) pioneered **memory-hard functions** with a theoretical foundation in time-memory trade-offs:

$$\text{scrypt}(P, S, N, r, p) \rightarrow \text{PBKDF2}(\text{Salsa20/8}, P, S, p · N)$$

Where:
- $N$ = Memory cost factor (must be power of 2, typically 2^14+)
- $r$ = Block size (typically 8 or 16)
- $p$ = Parallelization factor (1-255)

**The ROMix Construction:**

1. **Memory allocation**: Allocate $N · r$ blocks of 128 bytes each
2. **Sequential filling**: $B_i = \text{PRF}(B_{i-1}, dots, B_{i-r})$ for $N$ iterations
3. **Random access**: $V_j = B_{\text{Random}(N)}$ — access pattern depends on derived values
4. **Sequential read**: Re-read all blocks in reverse order mixing values

The critical property is that **computing the hash requires filling and then randomly accessing the memory buffer**. An attacker without sufficient RAM must recompute values on-demand, incurring O($N · r$) recomputation per block—destroying the attack efficiency.

**Security Analysis:**

| Attack Vector | Resistance Level | Explanation |
|---------------|------------------|-------------|
| GPU/ASIC | Very High | Memory bandwidth is the bottleneck |
| FPGA | High | Requires large embedded memory or external RAM |
| Cloud instances | Moderate | Memory cost increases attack expense |

scrypt's primary limitation is **parameter tuning**: $N$ must be chosen based on available RAM on the authentication server. Too low, and attacks are feasible; too high, and denial-of-service becomes a risk.

### 2.6 Argon2: The Current State of the Art

The **Password Hashing Competition** (2013-2015) evaluated 24 candidates against rigorous security and practicality criteria. Argon2 was selected as the winner and subsequently standardized in **RFC 9106**.

#### 2.6.1 Design Philosophy

Argon2 addresses three attack vectors simultaneously:

1. **GPU/ASIC resistance**: Memory hardness
2. **Side-channel resistance**: Data-independent addressing mode
3. **Trade-off resistance**: Sequential memory access patterns

#### 2.6.2 Memory-Hard Construction

Argon2 fills a memory array $M$ of size $t · 1024$ bytes using the **Blake2b** compression function:

$$G(a, b, c, d) \rightarrow \text{Blake2b round}$$

The filling phase processes $B_0, B_1, dots, B_{t-1}$ with a transformation that depends on previous blocks, creating strong data dependencies. The subsequent pass processes blocks in a **pseudo-random order** determined by $B_i$ itself—creating a self-referential access pattern that cannot be optimized away.

#### 2.6.3 Three Variants

| Variant | Access Pattern | Use Case | Side-Channel Risk |
|---------|----------------|----------|-------------------|
| **Argon2d** | Data-dependent | Cryptocurrency, no side-channel concerns | Vulnerable to cache-timing |
| **Argon2i** | Data-independent | General password storage | Resistant to all timing attacks |
| **Argon2id** | Hybrid (first half data-independent) | **Recommended default** | Best of both worlds |

The **hybrid approach** (Argon2id) combines:
- Initial passes: Data-independent addressing (safe from side-channels)
- Final passes: Data-dependent addressing (maximizes memory hardness)

#### 2.6.4 Parameter Selection (RFC 9106 Guidelines)

| Parameter | Minimum | Recommended | Maximum |
|-----------|---------|-------------|---------|
| **Time cost ($t$)** | 1 | 3 (iterations) | Unlimited |
| **Memory cost ($m$)** | 2 · $p$ · 32 | 2^19 (512 MB) per thread | System RAM |
| **Parallelism ($p$)** | 1 | 2-4 | Memory-limited |
| **Salt length** | 16 bytes | 16-32 bytes | Unlimited |
| **Tag length** | 16 bytes | 32 bytes | 64 bytes |

**Recommended Configuration for Web Applications:**

\`\`\`python
# Python example using argon2-cffi
import argon2

ph = argon2.PasswordHasher(
    time_cost=3,           # Number of iterations
    memory_cost=65536,     # 64 MB (2^16 * 1 KB blocks)
    parallelism=4,         # Parallel threads
    hash_len=32,           # Output length
    salt_len=16            # Salt length
)

# Verification takes ~500ms on modern hardware
hash = ph.hash("password")
ph.verify(hash, "password")
\`\`\`

**Attack Cost Analysis:**

For a 64MB memory-hard function with 3 iterations:
- **Legitimate verification**: ~500ms on server
- **Single GPU**: Cannot parallelize due to memory requirement
- **Attack efficiency**: ~2 hashes/second/GPU (limited by memory bandwidth)
- **10^12 guess attack**: ~15,000 GPU-years

This represents a **security improvement of 10^9-10^12×** over SHA-256 for equivalent computational cost.

## 3. Salt, Pepper, and Protection Against Precomputation Attacks

### 3.1 The Rainbow Table Attack

A **time-memory trade-off attack** (TMTO) precomputes password hashes for a searchable space:

**Classic Rainbow Tables:**
1. Define password policy (e.g., 8 characters, lowercase + digits)
2. Generate chains: $\text{Hash} \rightarrow \text{Reduce} \rightarrow \text{Hash} \rightarrow dots$
3. Store only endpoints, reconstruct chains on lookup
4. **Result**: 500GB table covers $10^{12}$ passwords with minimal storage

**Defense Mechanism: Salting**

A **cryptographic salt** is a unique, random value appended to each password before hashing:

$$\text{Hash}(P parallel S_{\text{unique}})$$

**Security Properties:**

1. **Precomputation prevention**: Each user requires a unique attack computation
2. **Credential isolation**: Compromised database doesn't expose other accounts
3. **Collision resistance**: Same password maps to different hashes

**Critical Implementation Requirements:**

| Requirement | Rationale | Implementation |
|-------------|-----------|----------------|
| **Unique per user** | Prevents batch attacks | Generate using CSPRNG |
| **Unique per password change** | Limits exposure window | Always generate new salt |
| **Minimum 16 bytes** | Prevent birthday attacks | NIST SP 800-63B |
| **Stored with hash** | Required for verification | Append or store separately |

### 3.2 The Pepper: Adding an Application-Secret

A **pepper** differs from salt in one critical aspect: **it is not stored in the database**.

$$\text{Hash}(\text{Hash}(P parallel S_{\text{salt}}) parallel P_{\text{pepper}})$$

**Properties:**

1. **Single point of failure prevention**: Database compromise alone doesn't enable attacks
2. **Key management requirement**: Pepper must be rotated as a cryptographic key
3. **Application-scope**: Same pepper used for all users

**Use Cases:**

- High-security applications requiring defense-in-depth
- Compliance requirements (e.g., PCI-DSS key separation)
- Scenarios where database and application servers are compromised independently

### 3.3 k-Anonymity and Breach Detection

Modern systems must detect compromised credentials even for users who haven't been breached directly. The **HaveIBeenPwned (HIBP) k-anonymity protocol** provides privacy-preserving breach detection:

**Protocol:**

1. **Client**: $\text{Hash}(P) \rightarrow \text{SHA-1}(P)$ → Take first 5 characters → Query HIBP API
2. **Server**: Return all SHA-1 suffixes matching the prefix
3. **Client**: Check if full hash appears in response

**Privacy Properties:**

- Server never receives full hash
- Client only receives 5-character prefix worth of hashes
- User's presence in breach database is not revealed unless credentials match

**Implementation:**

\`\`\`python
import hashlib
import requests

def check_breach(password):
    sha1 = hashlib.sha1(password.encode()).hexdigest().upper()
    prefix, suffix = sha1[:5], sha1[5:]
    
    response = requests.get(
        f"https://api.pwnedpasswords.com/range/{prefix}"
    )
    
    for line in response.text.splitlines():
        hash_suffix, count = line.split(":")
        if hash_suffix == suffix:
            return int(count)  # Password found in breaches
    
    return 0  # No breach found
\`\`\`

## 4. Threat Modeling for Password Storage Systems

### 4.1 Attack Surface Analysis

A comprehensive threat model for password storage must address:

| Attack Vector | Description | Mitigation |
|---------------|-------------|------------|
| **Offline database breach** | Attacker obtains password hashes | Memory-hard KDFs (Argon2) |
| **Online brute-force** | Attacker guesses via authentication API | Rate limiting, account lockout |
| **Credential stuffing** | Using breached creds on other services | k-anonymity monitoring, 2FA |
| **Phishing/credential capture** | User inputs password on fake site | Security education, FIDO2/WebAuthn |
| **Server-side compromise** | Malware on authentication server | Defense-in-depth, HSMs |
| **Side-channel attacks** | Timing/power analysis on verification | Constant-time comparison, Argon2i |

### 4.2 The Offline Attack Scenario

The **most critical threat** is a database breach, where the attacker obtains all password hashes and can perform offline computation without rate limits.

**Attack Timeline Model:**

| Phase | Duration | Attacker's Capability |
|-------|----------|----------------------|
| **Discovery** | Minutes | Attacker identifies breach |
| **Collection** | Hours | Hashes exfiltrated |
| **Cracking** | Days-Years | GPU/ASIC cluster attacks |
| **Exfiltration** | Minutes | Obtained plaintext passwords |

**Defensive Strategy:**

The security goal is to make the **cracking phase** longer than the useful lifetime of the passwords. For typical user passwords:

| KDF Configuration | Estimated Time to Crack "Password123" | Time to Crack "CorrectHorseBatteryStaple" |
|-------------------|---------------------------------------|-------------------------------------------|
| MD5 (no salt) | <1 second | ~2 hours |
| PBKDF2-SHA256 (100k iter) | ~2 hours | ~50,000 years |
| bcrypt (cost 12) | ~6 hours | ~500,000 years |
| Argon2id (64MB, 3 iter) | ~2 days | >10^15 years |

### 4.3 Storage Format and Migration

Modern password storage requires careful format design to enable algorithm upgrades:

**Recommended Storage Format:**

\`\`\`
$argon2id$v=19$m=65536,t=3,p=4$c2FsdHlzYWx0MjBieXRlcw$hashbytesbase64encoded
\`\`\`

**Format Components:**

| Component | Purpose | Example |
|-----------|---------|---------|
| **Algorithm identifier** | Specify KDF | \`$argon2id$\` |
| **Version** | Future-proofing | \`v=19\` |
| **Parameters** | Tunable cost settings | \`m=65536,t=3,p=4\` |
| **Salt** | Unique per-hash | Base64-encoded |
| **Hash** | Verifier | Base64-encoded |

**Migration Strategy:**

1. Store format as versioned prefix (e.g., \`v1$bcrypt\`, \`v2$argon2id\`)
2. On successful verification, re-hash with current best algorithm
3. Gradually migrate userbase as they authenticate
4. Consider async migration for inactive users

## 5. NIST SP 800-63B: Modern Standards and Their Rationale

### 5.1 The Paradigm Shift

NIST SP 800-63B (Digital Identity Guidelines) represents a fundamental departure from legacy complexity requirements:

**Removed Requirements:**
- Mandatory complexity rules (uppercase/lowercase/digit/symbol)
- Periodic password expiration without cause
- Character composition restrictions

**Added Requirements:**
- Minimum 8 characters (up to 64+ recommended)
- Support for passphrases
- Screening against breached password lists
- Rate limiting and anomaly detection
- Length-based strength estimation

### 5.2 Technical Rationale

The NIST guidelines reflect empirical evidence on user behavior:

**The Complexity Paradox:**
Mandating complexity doesn't increase security—it shifts the distribution of passwords into predictable patterns. Studies show that:
- 80% of users append digits to meet complexity requirements
- 60% use predictable special characters (! @ $)
- 40% use common substitutions (a→@, e→3)

**Length as the Strongest Predictor:**
NIST's emphasis on length is information-theoretically sound:
- Each character adds entropy regardless of composition
- Length is additive; complexity has diminishing returns
- Longer passwords resist both dictionary and brute-force attacks

### 5.3 Implementation Checklist

Compliance with NIST SP 800-63B requires:

| Requirement | Implementation |
|-------------|----------------|
| Minimum length 8 | Validate input length |
| Maximum length 64+ | Support passphrases |
| Unicode support | Normalize to UTF-8, calculate entropy correctly |
| No composition rules | Remove complexity validation |
| Breach checking | Query HIBP or internal blocklist |
| Rate limiting | Exponential backoff, account lockout |
| Device fingerprinting | Detect automated attacks |
| Alternative authentication | Offer WebAuthn/FIDO2 |

## 6. Best Practices for Engineering Teams

### 6.1 Algorithm Selection Decision Tree

\`\`\`
Start
├─ Are side-channel attacks a concern?
│   ├─ Yes: Argon2i or Argon2id
│   └─ No: Argon2id (recommended) or Argon2d
├─ Is memory-constrained environment?
│   ├─ Yes: scrypt (lower memory available)
│   └─ No: Argon2id (higher security)
└─ Is legacy compatibility required?
    └─ bcrypt (for gradual migration only)
\`\`\`

### 6.2 Parameter Tuning Guidelines

**Initial Deployment:**

| Parameter | Development | Production |
|-----------|-------------|------------|
| Argon2id memory | 32-64 MB | 128-256 MB |
| Argon2id time | 2 iterations | 3-4 iterations |
| Argon2id parallelism | 1-2 | 2-4 |
| Verification time | <100ms | 200-500ms |

**Tuning Process:**

1. Establish baseline: Start with minimal parameters
2. Measure verification time on target hardware
3. Increase memory until time reaches 500ms limit
4. Adjust time cost to hit target verification latency
5. Test under load: simulate 1000 concurrent authentications

### 6.3 Security Testing Protocol

**Automated Testing:**

\`\`\`python
def test_password_storage():
    # Test 1: Same password produces different hashes (salt uniqueness)
    hash1 = ph.hash("password")
    hash2 = ph.hash("password")
    assert hash1 != hash2
    
    # Test 2: Verification succeeds for correct password
    assert ph.verify(hash1, "password") is None
    
    # Test 3: Verification fails for incorrect password
    from argon2.exceptions import VerifyMismatchError
    with pytest.raises(VerifyMismatchError):
        ph.verify(hash1, "wrongpassword")
    
    # Test 4: Hash format matches expected structure
    assert hash1.startswith("$argon2id$")
    
    # Test 5: Re-hashing on verification (for migration)
    # Verify returns None on success; check if rehashing needed
\`\`\`

**Penetration Testing:**

- Offline cracking attempts on sample database
- Timing attack analysis on verification path
- Side-channel assessment (cache timing, power analysis)
- Rate limiting bypass attempts

## 7. Future Directions and Emerging Threats

### 7.1 Quantum Computing Considerations

While quantum computers don't directly threaten password hashing (which relies on symmetric properties), the ** Grover's algorithm** provides a quadratic speedup for brute-force:

$$\text{Quantum advantage}: O(sqrt{N}) \text{ vs } O(N)$$

**Mitigation:**
- Target 128-bit security (Grover reduces to 64 bits)
- Argon2's memory hardness is quantum-resistant
- Plan for longer passwords as margin

### 7.2 Hardware Security Modules

For highest-security deployments, consider **HSM-backed password verification**:

- Keys never exposed to application server
- Tamper-resistant cryptographic operations
- Attestation of algorithm version and parameters

### 7.3 Post-Quantum Credential Storage

As post-quantum cryptography matures, password storage may evolve to:
- **Hybrid KDFs**: Combining classical and post-quantum primitives
- **Lattice-based hardness**: Argon2 + LWE-based memory-hard functions
- **Standardization**: NIST post-quantum cryptography project outputs

## 8. Conclusion

Password security has evolved from a compliance checkbox exercise into a sophisticated discipline at the intersection of information theory, cryptography, and adversarial threat modeling.

**Key Takeaways:**

1. **Entropy is not character composition**: Length and random selection matter more than complexity rules.

2. **Memory hardness is mandatory**: GPU and ASIC attacks render CPU-only KDFs inadequate.

3. **Argon2id is the current standard**: It provides the best combination of memory hardness, side-channel resistance, and practical deployability.

4. **Salting is foundational**: Unique salts prevent precomputation attacks and credential reuse.

5. **NIST SP 800-63B reflects empirical evidence**: Removing complexity requirements improves security by aligning policy with user behavior.

6. **Defense-in-depth is essential**: No single control is sufficient; combine KDFs, rate limiting, breach detection, and modern authentication.

**Implementation Mandate**:

For new systems, deploy Argon2id with minimum parameters:
- Memory: 64-128 MB (per thread)
- Time: 3 iterations
- Parallelism: Match available CPU cores
- Salt: 16 bytes minimum

For legacy systems, implement **transparent migration**: re-hash passwords with stronger algorithms upon successful verification, accepting the gradual transition.

The security of user authentication depends on rigorous engineering decisions informed by cryptographic research. This document provides the theoretical foundation for making those decisions correctly.
`;

  const tocItems = extractTOCFromText(content);
  const showTOC = shouldShowTOC(tocItems);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <>
      <PasswordGuideStructuredData />
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="flex gap-8">
          {/* Main Content */}
          <motion.article
            className={`${showTOC ? "lg:w-2/3" : "max-w-4xl mx-auto"}`}
            variants={staggerChildren}
            initial="initial"
            animate="animate"
          >
            <motion.div className="space-y-8" variants={fadeInUp}>
              {/* Article Header with Cover Image */}
              <ArticleHeader
                title={articleData.title}
                description={articleData.description}
                author={articleData.author}
                date={articleData.date}
                readTime={articleData.readTime}
                tags={articleData.tags}
                image={articleData.image}
                featured={articleData.featured}
              />

              {/* Article Content */}
              <div className="prose prose-lg max-w-none streamdown-content">
                <StreamdownRenderer content={content} />
              </div>
            </motion.div>
          </motion.article>

          {/* Enhanced Streamdown TOC */}
          {showTOC && (
            <StreamdownTOC
              items={tocItems}
              enableAutoExtract={false}
              stickyOffset={80}
              showProgress={true}
            />
          )}
        </div>
      </div>
    </>
  );
}
